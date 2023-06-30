import ShortUrl, { IShortUrl } from "../models/Link";
import QRCode from "qrcode-generator";
import fs from "fs";
import moment from "moment";
import { Request, Response } from "express";
import { RequestWithUser } from "../middleware/MW";


async function getShortUrls(req: RequestWithUser, res: Response) {
  try {


    const shortUrls = await ShortUrl.find({user: req.user}).sort({createdAt: 1});
    //  console.log(req.user); 
  
    res.render("urlpage", { shortUrls: shortUrls });

  } catch (error) { 
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
  
async function createShortUrl (req: RequestWithUser, res: Response) {
  try {
   
     await ShortUrl.create({ fullUrl: req.body.fullUrl, user: req.user });
    res.redirect("/url");
  } catch (error) {
    return res.status(400).json({error})
  }
  
}

async function redirectToFullUrl(req: Request, res: Response) {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.fullUrl);
}

async function generateQRCode(req: Request, res: Response) {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    const qrCodeData = shortUrl.fullUrl;
    const qrCodePath = `public/qrcodes/${shortUrl.short}.png`;

    const qrCode = QRCode(0, "L");
    qrCode.addData(qrCodeData);
    qrCode.make();

    const qrCodeImage = qrCode.createDataURL(10);

    fs.writeFileSync(qrCodePath, qrCodeImage.split(".")[1], "base64");

    res.download(qrCodePath, "qrcode.png", (error) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
      // Delete the QR code image file after download
      fs.unlinkSync(qrCodePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export {
  getShortUrls,
  createShortUrl,
  redirectToFullUrl,
  generateQRCode
};
