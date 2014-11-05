function objective(objectiveName, objectiveDesc, associates, children) {
    this.name = objectiveName;
    this.desc = objectiveDesc;
    this.associates = associates;
    this.children = children;
}


function getObjectiveList() {
    var mockObjs = [
        new objective("Strategic Direction 01",
            "First strategic direction",
            [],
            [
                new objective("Strategy 01.01", "First strategy", [], [
                    new objective("Objective 01.01.001", "First objective", [], [])
                ])
            ]
        )
    ];
    return mockObjs;
}

function generateTreeList(objectiveList) {
    var index = 0;
    var retArray = [];
    for (index = 0; index < objectiveList.length; ++index) {
        if (objectiveList[index].children.length == 0) {
            retArray.push({
                    label: objectiveList[index].name,
                    data: objectiveList[index]
                }
            )
        }
        else {
            retArray.push({
                    label: objectiveList[index].name,
                    data: objectiveList[index],
                    children: generateTreeList(objectiveList[index].children)
                }
            )
        }
    }
    return retArray;
}

function getObjectiveByName(objectiveName, locObjList) {
    var index = 0;
    var found;

    for (index = 0; index < locObjList.length; ++index) {
        if (locObjList[index].name == objectiveName) {
            found = locObjList[index];
        }
        else {
            if (locObjList[index].children.length == 0) {
                found = new objective("Dummy", "Dummy", [], []);
            }
            else {
                found = getObjectiveByName(objectiveName, locObjList[index].children);
            }

        }
    }
    return found;
}