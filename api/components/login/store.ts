import { MyQuery } from "../../../shared_models/query_interfaces";
import MemberModel from "../register/models/member_model";

export default class Store {

    async getMemberByAggregate(aggregate: any[]) {
        return await MemberModel.aggregate(aggregate);
    }

    async getMemberByQuery({ find, options, settings }: MyQuery) {
        return await MemberModel.findOne( find, options, settings );
    }

    async updateMemberByQuery({ find, options, settings }: MyQuery) {
        return await MemberModel.updateOne(find, options, settings);
    }
}