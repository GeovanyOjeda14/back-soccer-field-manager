import UserModel from "./models/user_model";
import AdminModel from "./models/admin_model";
import MemberModel from "./models/member_model";
import { Admin, Member, User} from "./models/interfaces";
import { MyQuery } from "../../../shared_models/query_interfaces";

export default class Store {

    async saveMember(member: Partial<Member>) {
        const newMember = new MemberModel(member);
        return await newMember.save();
    }

    async saveUser(user: User) {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async saveAdmin(admin: Admin) {
        const newAdmin = new AdminModel(admin);
        return await newAdmin.save();
    }

    async updateMemberByQuery({ find, options, settings }: MyQuery) {
        return MemberModel.findOneAndUpdate(find, options, settings).exec();
    }
}