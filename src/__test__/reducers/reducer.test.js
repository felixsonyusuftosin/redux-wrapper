/**
 * @file tests for reducers
 */
import { reducerObject } from "../../reducers/reducer";

// test suites
describe(" Reducers", () => {
  it("should return initial state", () => {
    expect(
      reducerObject({ TEST_STORE: "TEST_STORE" }).TEST_STORE(undefined, {})
    ).toEqual({
      pending: false,
      payload: null,
      error: null
    });
  });
  it(" should handle Pending state for  add test store item", () => {
    expect(
      reducerObject({ TEST_STORE: "TEST_STORE" }).TEST_STORE(undefined, {
        type: "REQUEST_TEST_STORE"
      })
    ).toEqual({
      pending: true,
      payload: null,
      error: false
    });
  });
  it(" should handle  Payload state for adding test store item", () => {
    expect(
      reducerObject({ TEST_STORE: "TEST_STORE" }).TEST_STORE(undefined, {
        type: "RECIEVE_TEST_STORE",
        payload: {
          defaultObject: " Happend"
        }
      })
    ).toEqual({
      pending: false,
      payload: {
        defaultObject: " Happend"
      },
      error: false
    });
  });
  it(" should handle  Error state for adding test store item", () => {
    expect(
      reducerObject({ TEST_STORE: "TEST_STORE" }).TEST_STORE(undefined, {
        type: "FAIL_TEST_STORE",
        error: " Happend"
      })
    ).toEqual({
      pending: false,
      payload: null,
      error: " Happend"
    });
  });
});
