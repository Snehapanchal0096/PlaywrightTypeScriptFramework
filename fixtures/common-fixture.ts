import {test as baseTest} from "../fixtures/pom-fixture";
import CommonUtil from "../utils/CommonUtil";

type CommonFixturesType = {
    // Define any common fixtures here if needed in the future
    commonUtils: CommonUtil;
}

export const test= baseTest.extend<CommonFixturesType>({
    commonUtils : async({}, use) =>{
        await use(new CommonUtil(process.env.SECRET_KEY!));

    }
});