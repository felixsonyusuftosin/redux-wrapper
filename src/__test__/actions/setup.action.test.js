/**
 * @file setup tests for actions 
 */
// local imports 
import {
  setUpActions
} from '../../actions/setup.action';

describe('setUpActions', () => {
  let testActions = {
    TESTING_2: ['TESTING', 'TESTING_AGAIN']
  }
  let testActions2 = {
    TESTING_1: 'TESTING_1'
  }

  test('Action object to contain all the three action attributes ', () => {
    const actionObject = setUpActions(testActions2);
    const defaultObject = {
      TESTING_1: {
        request: `REQUEST_${testActions2.TESTING_1}`,
        recieve: `RECIEVE_${testActions2.TESTING_1}`,
        fail: `FAIL_${testActions2.TESTING_1}`,
      }
    }
    expect(actionObject).toMatchObject(defaultObject);

  })
  test('Action Objects with an array type must match all three action attributes for each array type ', () => {
    const actionObject = setUpActions(testActions);
    const defaultObject = {
      TESTING: {
        request: `REQUEST_${testActions.TESTING_2[0]}`,
        recieve: `RECIEVE_${testActions.TESTING_2[0]}`,
        fail: `FAIL_${testActions.TESTING_2[0]}`
      },
      TESTING_AGAIN: {
        request: `REQUEST_${testActions.TESTING_2[1]}`,
        recieve: `RECIEVE_${testActions.TESTING_2[1]}`,
        fail: `FAIL_${testActions.TESTING_2[1]}`
      }

    }
    expect(actionObject).toMatchObject(defaultObject);

  })

})