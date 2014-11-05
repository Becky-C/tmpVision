function associate(assocName, assocManager, assocDept, numObjectives) {
    this.name = assocName;
    this.manager = assocManager;
    this.dept = assocDept;
    this.currLoad = numObjectives;
}

function getAssociateList() {
    var mockObjs = [
        new associate("Becky",
            "Jeff M",
            "IT",
            4
        ),
        new associate("1",
            "Jeff M",
            "IT",
            4
        ),
        new associate("2",
            "Jeff M",
            "IT",
            4
        ),
        new associate("3",
            "Jeff M",
            "IT",
            4
        ),
        new associate("Mukul",
            "Tara R",
            "IT",
            2
        ),
        new associate("ASD",
            "Tara R",
            "IT",
            2
        ),
        new associate("VDS",
            "Tara R",
            "IT",
            2
        ),
        new associate("pQO",
            "Tara R",
            "IT",
            2
        ),
        new associate("ABC",
            "QTS",
            "Acct",
            0
        )
    ];
    return mockObjs;
}

function createSortedTreeList(associateList, sortType) {
    if (sortType == "Name" || sortType == null) {
        associateList.sort(
            function(a,b)
            {
                var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            }
        );
        var index = 0;
        var tempindex = 0;
        var retArray = [];
        while(index < associateList.length) {
            var currentLetter = associateList[index].name.substring(0,1);
            var currentArray = [];
            currentArray.push({label:associateList[index].name, data:associateList[index]});
            index++;
            while(index < associateList.length && associateList[index].name.substring(0,1) == currentLetter)
            {
                currentArray.push({label:associateList[index].name, data:associateList[index]});
                index++;
            }
            retArray.push({label:currentLetter, children:currentArray});
            tempindex++;
        }
        return retArray;
    }
    if (sortType == "Department" || sortType == null) {
        var index;
        var retArray=[];
        associateList.sort(
            function(a,b)
            {
                var nameA=a.dept.toLowerCase(), nameB=b.dept.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            }
        );
        var index = 0;
        var tempindex = 0;
        var retArray = [];
        while(index < associateList.length) {
            var currentLetter = associateList[index].dept;
            var currentArray = [];
            currentArray.push({label:associateList[index].name, data:associateList[index]});
            index++;
            while(index < associateList.length && associateList[index].dept == currentLetter)
            {
                currentArray.push({label:associateList[index].name, data:associateList[index]});
                index++;
            }
            retArray.push({label:currentLetter, children:currentArray});
            tempindex++;
        }
        return retArray;
    }
}

function getAssociateByName(associateName, associateList)
{
    var index = 0;

    for (index = 0; index < associateList.length; ++index) {
        if (associateList[index].name == associateName) {
            return associateList[index];
        }
    }
    return null;
}
function startsWith(prefix, str)
{
    if(str.substring(0,prefix.length)==prefix)
    {
        return true;
    }
    return false;
};