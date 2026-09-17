import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILES_DIR = path.join(process.cwd(), 'public', 'files');

// Helper to determine mime type
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.doc':
      return 'application/msword';
    case '.pdf':
      return 'application/pdf';
    case '.csv':
      return 'text/csv; charset=utf-8';
    case '.xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case '.zip':
      return 'application/zip';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const asset = searchParams.get('asset') || '';
  const requestedFile = searchParams.get('file') || '';

  // 1. Direct file download request from public/files
  if (requestedFile || asset === 'gujarati_docx' || asset === 'gujarati') {
    const filenameToServe = requestedFile || 'AI_Business_Growth_Kit_Gujarati.docx';
    const safeFilename = filenameToServe.replace(/\.\./g, '').replace(/^\/+/, '');
    const filePath = path.join(FILES_DIR, safeFilename);

    if (fs.existsSync(filePath)) {
      try {
        const fileBuffer = await fs.promises.readFile(filePath);
        const mimeType = getMimeType(safeFilename);

        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename="${path.basename(safeFilename)}"`,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'no-store, must-revalidate',
          },
        });
      } catch (e: any) {
        console.error('Error reading real file:', e);
      }
    }
  }

  // 2. Default to the real Gujarati document if 'all' or no specific text asset
  if (asset === 'all' || !asset) {
    const gujaratiFilePath = path.join(FILES_DIR, 'AI_Business_Growth_Kit_Gujarati.docx');
    if (fs.existsSync(gujaratiFilePath)) {
      const fileBuffer = await fs.promises.readFile(gujaratiFilePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': 'attachment; filename="AI_Business_Growth_Kit_Gujarati.docx"',
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'no-store, must-revalidate',
        },
      });
    }
  }

  // 3. Fallback modular text & csv resources
  const fileMap: Record<string, { filename: string; content: string; contentType: string }> = {
    prompts: {
      filename: '100_ChatGPT_Prompts_AI_Growth_Kit.txt',
      content: `================================================================================
AI BUSINESS GROWTH KIT — 100 HIGH-CONVERTING CHATGPT PROMPTS (GUJARATI & ENGLISH)
Licensed exclusively for verified customer use. Redistribution prohibited.
================================================================================

1. INSTAGRAM REEL SCRIPT GENERATOR:
"Act as a viral Indian Instagram strategist. Write a 30-second Reel script for a [business niche] addressing [pain point]. Hook the viewer in the first 3 seconds, deliver 3 actionable steps, and conclude with a high-converting call to action to comment 'GROW' for the link."

2. STORY SEQUENCE FOR MAXIMUM DM ENGAGEMENT:
"Generate a 4-part Instagram Story sequence for my [business/offer] that creates curiosity in Story 1, builds emotional resonance in Story 2, demonstrates social proof in Story 3, and presents an irresistible limited-time offer with a DM trigger in Story 4."

3. HIGH-RETENTION CAROUSEL HOOK & OUTLINE:
"Create a 7-slide Instagram carousel breakdown on [topic]. Slide 1 must feature a high-curiosity headline. Slides 2-6 give concise, bulleted insights with zero fluff. Slide 7 provides a compelling CTA to save and share."

4. WHATSAPP BROADCAST CONVERSION PROMPT:
"Write a warm, non-spammy broadcast message for existing leads about our [product/service], creating urgency without being pushy."

... [Full Prompt Database included in the Master Gujarati Document]
`,
      contentType: 'text/plain; charset=utf-8',
    },
    hooks: {
      filename: '100_Viral_Reel_Hooks_CheatSheet.csv',
      content: `Category,Hook Text,Visual Action
Curiosity,"Stop making this 1 mistake if you want to grow on Instagram in 2025","Point urgently at camera"
Contrarian,"Why posting daily is actually destroying your reach...","Shake head looking concerned"
Value,"Here is the exact ChatGPT prompt that got me 100k views","Show phone screen with notes"
Authority,"I analyzed 500 viral Indian creator reels. Here is the secret pattern.","Fast paced text pop-ups"
Urgency,"If your reels are stuck at 200 views, watch this before you post again","Zoom in on face"
Social Proof,"How this small business generated 50 inquiries in 48 hours without ads","Show customer chat screenshots"
`,
      contentType: 'text/csv; charset=utf-8',
    },
    calendar: {
      filename: '30_Day_Content_Calendar_Schedule.csv',
      content: `Day,Content Pillar,Post Format,Topic Idea,Call To Action
Day 01,Authority,Reel,Why most businesses fail in [industry],Comment 'GUIDE'
Day 02,Value,Carousel,5 tools that save 10 hours a week,Save this post
Day 03,Story,Single Post,The biggest mistake I made when starting,Share your thoughts
Day 04,Social Proof,Stories,Customer review & transformation breakdown,DM 'START'
Day 05,Contrarian,Reel,Unpopular opinion about [niche],Comment your view
Day 06,Engagement,Stories,Poll: Which challenge is hardest for you?,Vote below
Day 07,Offer,Reel,Behind the scenes of our signature system,Link in bio
`,
      contentType: 'text/csv; charset=utf-8',
    },
    scripts: {
      filename: 'Business_Sales_Closing_Scripts.txt',
      content: `================================================================================
AI GROWTH KIT — SALES & OBJECTION CLOSING SCRIPTS
================================================================================

SCRIPT 1: INCOMING INQUIRY CLOSING
"Hi [Name]! Thanks for reaching out about [Product]. We help [audience] achieve [benefit] in under 30 days. To give you the best recommendation, are you looking to [Goal A] or [Goal B]?"

SCRIPT 2: HANDLING "PRICE IS TOO HIGH"
"I completely understand [Name]! When clients first see this, they compare it to generic courses. But this is a plug-and-play execution kit that saves 20+ hours every month. Most creators recover their ₹499 investment with their very first client lead."

SCRIPT 3: RE-ENGAGING COLD LEADS
"Hey [Name]! Quick question—did you manage to sort out [pain point]? We just updated our 30-day template and I thought of your business."
`,
      contentType: 'text/plain; charset=utf-8',
    },
    bonus1: {
      filename: 'Bonus_Prompt_Engineering_Mastery.txt',
      content: `AI Prompt Engineering Mastery: The C-T-C-O (Context, Task, Constraints, Output) Framework for 10x better ChatGPT outputs.`,
      contentType: 'text/plain; charset=utf-8',
    },
    bonus2: {
      filename: 'Bonus_50_Lead_Magnet_Blueprints.txt',
      content: `50 High-Converting Lead Magnet Blueprints for Coaches, Agencies, Creators, and Local Businesses.`,
      contentType: 'text/plain; charset=utf-8',
    },
    bonus3: {
      filename: 'Bonus_Hook_Writing_Masterclass_Access.txt',
      content: `Masterclass Link: https://businessdatahub.com/masterclass-access\nPasscode: BDH-VIP-CREATOR`,
      contentType: 'text/plain; charset=utf-8',
    },
    bonus4: {
      filename: 'Official_Commercial_License_Certificate.txt',
      content: `COMMERCIAL USE LICENSE CERTIFICATE\nIssued by: BusinessDataHub AI Solutions\nStatus: Active Commercial License\nAuthorized Use: Single Operator / Creator for personal and client projects. Reselling or distributing this toolkit as a whole is strictly prohibited.`,
      contentType: 'text/plain; charset=utf-8',
    },
  };

  const fileData = fileMap[asset] || {
    filename: 'AI_Business_Growth_Kit_Guide.txt',
    content: 'Please access the primary document AI_Business_Growth_Kit_Gujarati.docx from the File Manager.',
    contentType: 'text/plain; charset=utf-8',
  };

  return new NextResponse(fileData.content, {
    status: 200,
    headers: {
      'Content-Type': fileData.contentType,
      'Content-Disposition': `attachment; filename="${fileData.filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
