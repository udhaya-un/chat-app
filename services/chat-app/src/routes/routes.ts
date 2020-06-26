import { UserController } from "../controllers/user_controller";

export class Routes {

    public userController: UserController = new UserController();

    public routes(base, app): void {

        app.route(`${base}/user/save`).post(this.userController.save);
        app.route(`${base}/user/update`).put(this.userController.update_by_id);
        app.route(`${base}/user/getall`).get(this.userController.get_all);
        app.route(`${base}/user/get`).get(this.userController.get_by_id);
        app.route(`${base}/user/delete`).delete(this.userController.delete_by_id);
        app.route(`${base}/user/login`).post(this.userController.login);
    }
}