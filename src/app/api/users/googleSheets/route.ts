import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Only POST request are allowed' },
      { status: 405 }
    );
  }

  const reqBody = await req.json();
  const {
    Date,
    Card_machine,
    Glovo_online,
    Pyszne_online,
    Bolt_online,
    UberEats_online,
    Cash_Card_OnlineApp_Notes,
    Kasa_Cash,
    Glovo_Cash,
    Cost_from_CashBox,
    CashBox_Remain,
    Hard_Cash,
    Retail_Cost,
    Faktura,
    Input_by,
    branchName,
  } = reqBody;
  if (
    Card_machine === '' ||
    Glovo_online === '' ||
    Pyszne_online === '' ||
    Bolt_online === '' ||
    UberEats_online === '' ||
    Cash_Card_OnlineApp_Notes === '' ||
    Kasa_Cash === '' ||
    Glovo_Cash === '' ||
    Cost_from_CashBox === '' ||
    CashBox_Remain === '' ||
    Hard_Cash === '' ||
    Retail_Cost === '' ||
    Faktura === ''
  ) {
    return NextResponse.json(
      { message: 'All the fields must have a value!' },
      { status: 404 }
    );
  }
  if (
    (branchName === 'kapelanka' &&
      (Input_by === 'asiqul' || Input_by === 'nasir')) ||
    (branchName === 'balicka' &&
      (Input_by === 'rokon' || Input_by === 'shoel' || Input_by === 'nasir')) ||
    (branchName === 'bulwar' &&
      (Input_by === 'iqbal' || Input_by === 'tuhin' || Input_by === 'nasir'))
  ) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({
        version: 'v4',
        auth: auth,
      });

      const kapSheet = process.env.GOOGLE_SHEET_ID;
      const balSheet = process.env.GOOGLE_SHEET_ID_BALICKA;
      const bulSheet = process.env.GOOGLE_SHEET_ID_BULWAR;
      const sheetIdentity = () => {
        if (branchName === 'kapelanka') {
          return kapSheet;
        } else if (branchName === 'balicka') {
          return balSheet;
        } else if (branchName === 'bulwar') {
          return bulSheet;
        } else {
          return '';
        }
      };

      const kapelanka = {
        spreadsheetId: sheetIdentity(),
        range: `${branchName}!A36:A`,
      };

      let data = await sheets.spreadsheets.values.get(kapelanka);
      if (!data) {
        return NextResponse.json(
          { message: 'something went wrong!' },
          { status: 404 }
        );
      }
      const sheetsDate = data.data.values;
      let today = null;

      sheetsDate?.forEach((el) => {
        el.filter((d) => {
          if (d === Date) {
            today = d;
          }
        });
      });

      if (today !== null) {
        return NextResponse.json(
          { message: 'You can submit daily accounting only once!' },
          { status: 404 }
        );
      }

      const kapelanka2 = {
        spreadsheetId: sheetIdentity(),
        range: `${branchName}!A36:O`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [
            [
              Date,
              Card_machine,
              Glovo_online,
              Pyszne_online,
              Bolt_online,
              UberEats_online,
              Cash_Card_OnlineApp_Notes,
              Kasa_Cash,
              Glovo_Cash,
              Cost_from_CashBox,
              CashBox_Remain,
              Hard_Cash,
              Retail_Cost,
              Faktura,
              Input_by,
            ],
          ],
        },
      };
      let dataWrite = await sheets.spreadsheets.values.append(kapelanka2);
      // here gose the logic
      return NextResponse.json(
        {
          message: 'data saved in googlesheet',
          data: dataWrite,
        },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
  } else {
    return NextResponse.json(
      { message: 'you are not allowed to submit the accounting!' },
      { status: 404 }
    );
  }
}
