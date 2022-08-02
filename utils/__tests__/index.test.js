import {
  hasExtension,
  random,
  removeDoubleSpace,
  trimSpace,
  truncate,
  isFollowing,
} from "../";

describe("Utils tests", () => {
  describe("hasExtension", () => {
    it("function should return true", () => {
      expect(hasExtension("jpg", ["png", "jpg", "jpeg"])).toBe(true);
    });

    it("function should return false", () => {
      expect(hasExtension("jpg", ["png", "gif", "jpeg"])).toBe(false);
    });
  });

  describe("random", () => {
    it("random number should not be greater than the max value", () => {
      const between = (start, number, end) => number <= end && number >= start;
      for (let i = 0; i < 50; i++) {
        const randomVal = random(5);
        expect(between(0, randomVal, 5)).toBe(true);
      }
    });
  });

  describe("isFollowing", () => {
    it("function should return true", () => {
      const uid = "1a5jkc";
      const dummyData = [{ uid: "testUId" }, { uid }, { uid: "test2uid" }];
      expect(isFollowing(uid, dummyData)).toBe(true);
    });

    it("function should return false", () => {
      const uid = "1a5jkc";
      const dummyData = [{ uid: "testUId" }, { uid: "test2uid" }];
      expect(isFollowing(uid, dummyData)).toBe(false);
    });
  });

  describe("truncate", () => {
    it("should truncate text", () => {
      expect(truncate("test text", 5)).toBe("test ...");
    });

    it("should not truncate text", () => {
      expect(truncate("test", 4)).toBe("test");
    });
  });

  describe("trimSpace", () => {
    it("should trim space", () => {
      expect(trimSpace("test ")).toBe("test");
    });

    it("should trim space properly with 2 words", () => {
      expect(trimSpace("test text ")).toBe("test text");
    });

    it("should not trim the space", () => {
      expect(trimSpace("test")).toBe("test");
    });
  });

  describe("removeDoubleSpace", () => {
    it("should remove double space", () => {
      expect(removeDoubleSpace("text     ")).toBe("text ");
    });

    it("should not remove double space", () => {
      expect(removeDoubleSpace("text ")).toBe("text ");
    });

    it("the text should be the same", () => {
      expect(removeDoubleSpace("test text")).toBe("test text");
    });
  });
});
