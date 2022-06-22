// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import credentials from "./credentials.json";
const SCOPES = [
  "https://www.googleapis.com/auth/script.deployments",
  "https://www.googleapis.com/auth/script.external_request",
  "https://www.googleapis.com/auth/admin.directory.user",
];
const { client_id, client_secret, redirect_uris } = credentials.installed;
const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
const script = google.script("v1");
const resp = await script.scripts.run({
  scriptId:
    "AKfycbx79ZMwTp1Wzdb7kO43Gt90qNk9pO78rMczngfYJ_i - DwwpyYG7DMEW3KH80goUYeEt",
  auth: auth,
});
console.log(resp);
