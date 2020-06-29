import { UserController } from "../controllers/user_controller";
import { ChatController } from "../controllers/chat_controller";
import { DeletedChatController } from "../controllers/deleted_chat_controller";

export class Routes {

    public userController: UserController = new UserController();
    public chatController: ChatController = new ChatController();
    public deletedChatController: DeletedChatController = new DeletedChatController();

    public routes(base, app): void {

        app.route(`${base}/user/save`).post(this.userController.save);
        app.route(`${base}/user/update`).put(this.userController.update_by_id);
        app.route(`${base}/user/getall`).get(this.userController.get_all);
        app.route(`${base}/user/get`).get(this.userController.get_by_id);
        app.route(`${base}/user/delete`).delete(this.userController.delete_by_id);
        app.route(`${base}/user/login`).post(this.userController.login);

        app.route(`${base}/chat/save`).post(this.chatController.save);
        app.route(`${base}/chat/get_by_sender_receiver/:sender_id/:receiver_id`).get(this.chatController.get_sender_and_receiver_chat);
        app.route(`${base}/chat/delete_chat_by_sender/:sender_id/:receiver_id`).get(this.chatController.delete_chat_by_sender);
        app.route(`${base}/chat/read/:sender_id/:receiver_id`).put(this.chatController.read_chat);
        app.route(`${base}/chat/backup/:sender_id`).get(this.chatController.backup_chat);
        app.route(`${base}/chat/unread/:sender_id/`).get(this.chatController.get_read_msg_by_sender);

        app.route(`${base}/chat/deleted_chat_by_sender/:sender_id`).get(this.deletedChatController.get_all_by_owner);


    }
}