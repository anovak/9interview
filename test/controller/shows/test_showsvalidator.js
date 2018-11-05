import test from 'ava';
import {ShowsValidator} from "../../../src/controller/shows/showsvalidator";

test('test_isValidForUseCase_is_allways_ok', async t => {
    const sv = new ShowsValidator();

    t.true( sv.isValidForUseCase().ok );
});

test('test_isValidForUseCase_is_allways_empty_errors', async t => {
    const sv = new ShowsValidator();

    t.is( sv.isValidForUseCase().errors.length, 0 );
});
