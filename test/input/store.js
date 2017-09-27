"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var store_1 = require("../../lib/input/store");
describe("InputStore", function () {
    it("passes new lines on change", function () {
        // Arrange
        var lines = ["original"];
        var newLines = ["modified"];
        var onChange = sinon_1.stub();
        var store = new store_1.InputStore({
            events: { onChange: onChange },
            input: {
                language: "javascript",
                value: lines.join("\n"),
            },
        });
        // Act
        store.receiveNewSettings({
            value: newLines.join("\n"),
        });
        // Assert
        chai_1.expect(onChange).to.have.been.calledWithMatch({
            language: "javascript",
            value: newLines.join("\n"),
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5wdXQvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBOEI7QUFDOUIsK0JBQTZCO0FBRTdCLCtDQUFtRDtBQUVuRCxRQUFRLENBQUMsWUFBWSxFQUFFO0lBQ25CLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUM3QixVQUFVO1FBQ1YsSUFBTSxLQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQixJQUFNLFFBQVEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLElBQU0sUUFBUSxHQUFHLFlBQUksRUFBRSxDQUFDO1FBQ3hCLElBQU0sS0FBSyxHQUFHLElBQUksa0JBQVUsQ0FBQztZQUN6QixNQUFNLEVBQUUsRUFBRSxRQUFRLFVBQUEsRUFBRTtZQUNwQixLQUFLLEVBQUU7Z0JBQ0gsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUN6QjtTQUNMLENBQUMsQ0FBQztRQUVILE1BQU07UUFDTixLQUFLLENBQUMsa0JBQWtCLENBQUM7WUFDckIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzdCLENBQUMsQ0FBQztRQUVILFNBQVM7UUFDVCxhQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzFDLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUM3QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvaW5wdXQvc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgfSBmcm9tIFwiY2hhaVwiO1xyXG5pbXBvcnQgeyBzdHViIH0gZnJvbSBcInNpbm9uXCI7XHJcblxyXG5pbXBvcnQgeyBJbnB1dFN0b3JlIH0gZnJvbSBcIi4uLy4uL2xpYi9pbnB1dC9zdG9yZVwiO1xyXG5cclxuZGVzY3JpYmUoXCJJbnB1dFN0b3JlXCIsICgpID0+IHtcclxuICAgIGl0KFwicGFzc2VzIG5ldyBsaW5lcyBvbiBjaGFuZ2VcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIEFycmFuZ2VcclxuICAgICAgICBjb25zdCBsaW5lcyA9IFtcIm9yaWdpbmFsXCJdO1xyXG4gICAgICAgIGNvbnN0IG5ld0xpbmVzID0gW1wibW9kaWZpZWRcIl07XHJcbiAgICAgICAgY29uc3Qgb25DaGFuZ2UgPSBzdHViKCk7XHJcbiAgICAgICAgY29uc3Qgc3RvcmUgPSBuZXcgSW5wdXRTdG9yZSh7XHJcbiAgICAgICAgICAgIGV2ZW50czogeyBvbkNoYW5nZSB9LFxyXG4gICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IFwiamF2YXNjcmlwdFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGxpbmVzLmpvaW4oXCJcXG5cIiksXHJcbiAgICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBY3RcclxuICAgICAgICBzdG9yZS5yZWNlaXZlTmV3U2V0dGluZ3Moe1xyXG4gICAgICAgICAgICB2YWx1ZTogbmV3TGluZXMuam9pbihcIlxcblwiKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXNzZXJ0XHJcbiAgICAgICAgZXhwZWN0KG9uQ2hhbmdlKS50by5oYXZlLmJlZW4uY2FsbGVkV2l0aE1hdGNoKHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6IFwiamF2YXNjcmlwdFwiLFxyXG4gICAgICAgICAgICB2YWx1ZTogbmV3TGluZXMuam9pbihcIlxcblwiKSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KTtcclxuIl19
