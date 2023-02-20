import { GoogleSpreadsheet } from "google-spreadsheet";
import { GoogleSheetConfig } from "../configs/gg.sheets.config";
import { CommunicationModel } from "../models/communication.model";

export class GoogleSheetService{
    private doc:GoogleSpreadsheet | undefined;
    private sheet:any;
    constructor(){
        this.doc = new GoogleSheetConfig().doc 
        this.config();
    };
    private config =async ():Promise<void> => {
        await this.doc?.loadInfo(); // loads document properties and worksheets
        try {
            this.sheet = this.doc?.sheetsByIndex[0];
        } catch (error) {
            console.log(error);
        }
    }
    public getCommunication=async():Promise<CommunicationModel[]> =>{
        let communications_list:CommunicationModel[] = [];
        try {
            let row = await this.sheet.getRows();          
            if(row)
                for(let i:number = 0; i < row.length; i++){
                    let reply:string = row[i].reply;
                    let messages:string = row[i].message;
                    let list_msg:string[] = messages?.split(',');                
                    for(let j:number = 0; j < list_msg?.length;j++){
                        let communications:CommunicationModel = new CommunicationModel(list_msg[j],reply);
                        communications_list.push(communications);
                    }
                }
        } catch (error) {
            console.log(error);
        }
        return communications_list;
    }
    public addCommunication=async(communicationModel:CommunicationModel):Promise<void> =>{
        await this.sheet.addRow({
            message: communicationModel.message,
            reply: communicationModel.reply
        })
    }
}