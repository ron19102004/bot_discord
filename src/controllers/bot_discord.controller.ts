import { CommunicationModel } from "../models/communication.model";
import { GoogleSheetService } from "../services/gg.sheets.service";

export class ChatBotDiscordController{
    private ggSheetService:GoogleSheetService;
    constructor(){
        this.ggSheetService = new GoogleSheetService();
    }
    public handle_event = (msg:any):void => {
        if (String(msg.author.id) !== process.env.ID_BOT) {            
           let message:string = this.handle_string_in(msg.content).toLowerCase().trim();
           this.ggSheetService.getCommunication().then(async(response)=>{
                let check:boolean = false;
                for(let i:number = 0; i < response.length; i++) {                    
                    if(message.indexOf(response[i].message.trim()) !== -1){
                        msg.reply(`${response[i].reply}`)
                        check = true;
                        break;
                    }
                }
                if(message.indexOf("|") !== -1){
                    let res:string[] = message.split("|");
                    if(res[2].indexOf("nhớ chưa") !== -1){
                        let communication:CommunicationModel = new CommunicationModel(res[0],res[1]);
                        await this.ggSheetService.addCommunication(communication);
                        msg.reply(`Tôi đã nhớ rồi. Cảm ơn bạn đã chỉ bảo 😀😀😀`)
                    } else {
                        msg.reply(`Có vẻ bạn đã dạy tôi sai cách rồi hjx. Thử lại i 😰😰😰`)
                    }
                } else{ 
                    if(!check){
                        msg.reply(`Xin lỗi. Tớ đã ghi nhận câu hỏi và sẽ trả lời câu này cậu sau 😉😉😉.Nếu bạn biết câu trả lời hãy dạy tôi bằng cú pháp "Từ khóa | Câu trả lời | nhớ chưa"`);
                        let communication:CommunicationModel = new CommunicationModel(`${message}`,"Chưa trả lời !!!");
                        await this.ggSheetService.addCommunication(communication);
                    }
                }
           });
        }
    }
    private handle_string_in = (str:string):string=>{
        let char_begin:boolean = (str.charAt(0) === "<") ? true : false;
        if(char_begin){
            let char_close:number = (str.lastIndexOf(">") !== -1) ? (str.lastIndexOf(">")+1) : 0;
            str = (char_close !== 0) ? str.slice(char_close,str.length) : str;
        }
        return str;
    }
}