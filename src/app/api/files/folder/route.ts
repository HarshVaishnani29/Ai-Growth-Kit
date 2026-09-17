import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILES_DIR = path.join(process.cwd(), 'public', 'files');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { folderName, path: subPath } = body;

    const cleanFolderName = String(folderName || '')
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    if (!cleanFolderName) {
      return NextResponse.json(
        { success: false, error: 'INVALID_NAME', message: 'Folder name must not be empty.' },
        { status: 400 }
      );
    }

    const safeSubPath = (subPath || '').replace(/\.\./g, '').replace(/^\/+/, '');
    const targetDir = path.join(FILES_DIR, safeSubPath, cleanFolderName);

    if (fs.existsSync(targetDir)) {
      return NextResponse.json(
        { success: false, error: 'ALREADY_EXISTS', message: `Folder "${cleanFolderName}" already exists.` },
        { status: 409 }
      );
    }

    await fs.promises.mkdir(targetDir, { recursive: true });

    return NextResponse.json({
      success: true,
      folderName: cleanFolderName,
      message: `Folder "${cleanFolderName}" created successfully.`,
    });
  } catch (err: any) {
    console.error('Create Folder Error:', err);
    return NextResponse.json(
      { success: false, error: 'SERVER_ERROR', message: err.message },
      { status: 500 }
    );
  }
}
