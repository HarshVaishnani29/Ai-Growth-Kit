import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILES_DIR = path.join(process.cwd(), 'public', 'files');
const MAX_FREE_STORAGE_BYTES = 50 * 1024 * 1024; // 50 MB Free Limit

// Helper to ensure files directory exists
function ensureFilesDir() {
  if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
  }
}

// Format bytes into readable string
function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Helper to determine file category/icon type
function getFileType(ext: string) {
  const clean = ext.toLowerCase().replace('.', '');
  if (['docx', 'doc'].includes(clean)) return 'word';
  if (['pdf'].includes(clean)) return 'pdf';
  if (['csv', 'xlsx', 'xls'].includes(clean)) return 'excel';
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(clean)) return 'archive';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(clean)) return 'image';
  if (['mp4', 'mov', 'avi', 'mkv'].includes(clean)) return 'video';
  if (['txt', 'md', 'json'].includes(clean)) return 'text';
  return 'file';
}

// GET: List files, directories, and calculate storage usage vs 50MB free quota
export async function GET(req: NextRequest) {
  try {
    ensureFilesDir();

    const { searchParams } = new URL(req.url);
    const subPath = searchParams.get('path') || '';

    // Sanitize path to prevent directory traversal
    const safeSubPath = subPath.replace(/\.\./g, '').replace(/^\/+/, '');
    const targetDir = path.join(FILES_DIR, safeSubPath);

    if (!fs.existsSync(targetDir)) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND', message: 'Directory does not exist' },
        { status: 404 }
      );
    }

    // Read directory
    const entries = await fs.promises.readdir(targetDir, { withFileTypes: true });

    let totalUsedBytes = 0;

    // Helper to calculate total size recursively
    const calculateAllFilesSize = (dir: string): number => {
      let size = 0;
      try {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
          const fullPath = path.join(dir, file.name);
          if (file.isDirectory()) {
            size += calculateAllFilesSize(fullPath);
          } else {
            const stats = fs.statSync(fullPath);
            size += stats.size;
          }
        }
      } catch (e) {
        // ignore read error
      }
      return size;
    };

    totalUsedBytes = calculateAllFilesSize(FILES_DIR);

    const items = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(targetDir, entry.name);
        const stats = await fs.promises.stat(fullPath);
        const isDir = entry.isDirectory();
        const ext = isDir ? '' : path.extname(entry.name);
        const relativeUrl = isDir ? null : `/files/${safeSubPath ? `${safeSubPath}/` : ''}${entry.name}`;

        return {
          id: entry.name,
          name: entry.name,
          isFolder: isDir,
          size: isDir ? calculateAllFilesSize(fullPath) : stats.size,
          formattedSize: formatBytes(isDir ? calculateAllFilesSize(fullPath) : stats.size),
          date: stats.mtime.toISOString(),
          formattedDate: stats.mtime.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          extension: ext,
          fileType: isDir ? 'folder' : getFileType(ext),
          downloadUrl: relativeUrl,
          isPrimary: entry.name.toLowerCase().includes('gujarati'),
        };
      })
    );

    // Sort folders first, then files alphabetically
    items.sort((a, b) => {
      if (a.isFolder === b.isFolder) {
        return a.name.localeCompare(b.name);
      }
      return a.isFolder ? -1 : 1;
    });

    const usedPercentage = Math.min(100, Math.round((totalUsedBytes / MAX_FREE_STORAGE_BYTES) * 100));

    return NextResponse.json({
      success: true,
      currentPath: safeSubPath ? `/${safeSubPath}` : '/',
      items,
      storage: {
        usedBytes: totalUsedBytes,
        usedFormatted: formatBytes(totalUsedBytes),
        maxBytes: MAX_FREE_STORAGE_BYTES,
        maxFormatted: '50.0 MB',
        freeFormatted: formatBytes(Math.max(0, MAX_FREE_STORAGE_BYTES - totalUsedBytes)),
        usedPercentage,
        storageMethod: 'Free Local Server Engine + Supabase Sync',
      },
    });
  } catch (err: any) {
    console.error('File Manager GET error:', err);
    return NextResponse.json(
      { success: false, error: 'SERVER_ERROR', message: err.message },
      { status: 500 }
    );
  }
}

// POST: Upload file up to 50MB
export async function POST(req: NextRequest) {
  try {
    ensureFilesDir();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const subPath = (formData.get('path') as string) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'NO_FILE', message: 'No file provided for upload.' },
        { status: 400 }
      );
    }

    // Enforce 50MB free quota per file
    if (file.size > MAX_FREE_STORAGE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'FILE_TOO_LARGE',
          message: `File size exceeds the 50 MB free limit (${formatBytes(file.size)} uploaded). Maximum allowed per file is 50 MB.`,
        },
        { status: 413 }
      );
    }

    // Check total directory storage capacity
    const calculateTotal = (dir: string): number => {
      let size = 0;
      try {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const f of files) {
          const p = path.join(dir, f.name);
          if (f.isDirectory()) size += calculateTotal(p);
          else size += fs.statSync(p).size;
        }
      } catch (e) {}
      return size;
    };

    const currentTotal = calculateTotal(FILES_DIR);
    if (currentTotal + file.size > MAX_FREE_STORAGE_BYTES * 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'STORAGE_EXCEEDED',
          message: 'Total free storage space would be exceeded. Please delete old files to free up space.',
        },
        { status: 400 }
      );
    }

    const safeSubPath = subPath.replace(/\.\./g, '').replace(/^\/+/, '');
    const targetDir = path.join(FILES_DIR, safeSubPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Sanitize filename
    const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetFilePath = path.join(targetDir, safeFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.promises.writeFile(targetFilePath, buffer);

    return NextResponse.json({
      success: true,
      message: `File "${safeFilename}" uploaded successfully (${formatBytes(file.size)}).`,
      file: {
        name: safeFilename,
        size: file.size,
        formattedSize: formatBytes(file.size),
        downloadUrl: `/files/${safeSubPath ? `${safeSubPath}/` : ''}${safeFilename}`,
      },
    });
  } catch (err: any) {
    console.error('File Manager POST error:', err);
    return NextResponse.json(
      { success: false, error: 'UPLOAD_FAILED', message: err.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete files or directories
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { names, path: subPath } = body;

    const fileNames: string[] = Array.isArray(names) ? names : [names].filter(Boolean);

    if (fileNames.length === 0) {
      return NextResponse.json(
        { success: false, error: 'MISSING_NAMES', message: 'No file names provided for deletion.' },
        { status: 400 }
      );
    }

    const safeSubPath = (subPath || '').replace(/\.\./g, '').replace(/^\/+/, '');
    const targetDir = path.join(FILES_DIR, safeSubPath);

    const deleted: string[] = [];
    const errors: string[] = [];

    for (const name of fileNames) {
      const safeName = name.replace(/\.\./g, '').replace(/^\/+/, '');
      const fullPath = path.join(targetDir, safeName);

      // Prevent deleting the root directory
      if (fullPath === FILES_DIR) continue;

      if (fs.existsSync(fullPath)) {
        try {
          const stats = fs.statSync(fullPath);
          if (stats.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
          deleted.push(safeName);
        } catch (e: any) {
          errors.push(`Failed to delete ${safeName}: ${e.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      deleted,
      errors,
      message: `Successfully deleted ${deleted.length} item(s).`,
    });
  } catch (err: any) {
    console.error('File Manager DELETE error:', err);
    return NextResponse.json(
      { success: false, error: 'DELETE_FAILED', message: err.message },
      { status: 500 }
    );
  }
}
