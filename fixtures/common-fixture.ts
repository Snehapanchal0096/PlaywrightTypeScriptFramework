import {test as baseTest} from "../fixtures/pom-fixture";
import CommonApiUtils from "../utils/CommonApiUtils";
import CommonUtil from "../utils/CommonUtil";

type CommonFixturesType = {
    // Define any common fixtures here if needed in the future
    commonUtils: CommonUtil;
    commonApiUtils: CommonApiUtils;
}

export const test= baseTest.extend<CommonFixturesType>({
    commonUtils : async({}, use) =>{
        await use(new CommonUtil(process.env.SECRET_KEY!));
    },
    commonApiUtils : async({request}, use) =>{
        await use(new CommonApiUtils(request));
    }
});