'use strict';
//git push angularGit master
/**
 * @ngdoc function
 * @name angularWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularWebApp
 */
angular.module('angularWebApp')
    .controller('MainCtrl', function ($scope) {

        $scope.my_data = [];
        $scope.assocSort = "Name";
        $scope.search = "";
        var masterObjectiveList = getObjectiveList();
        var currentSortSel = $scope.assocSort;
        $scope.currentSelection= masterObjectiveList[0];
        var currentObjSel=$scope.currentSelection;
        $scope.my_data = generateTreeList(masterObjectiveList);
        var masterAssociateList = getAssociateList();
        $scope.currentAssociateSelection=null;
        $scope.associate_data = createSortedTreeList(masterAssociateList, $scope.assocSort);
        var currentSelAssoc = null;
        $scope.cardHidden = "none";
        $scope.dynCardStyle = "{"
        /*staging area stack of associates*/
        $scope.stagedAssociates = [];
        //stack.push(2);       // stack is now [2]
        //stack.push(5);       // stack is now [2, 5]
        //var i = stack.pop();


        $scope.objective_tree_handler = function (branch) {
            var _ref;
            $scope.currentSelection = getObjectiveByName(branch.label, masterObjectiveList);
            currentObjSel = $scope.currentSelection;
        };
        $scope.associate_tree_handler = function (branch) {

            $scope.currentAssociateSelection = getAssociateByName(branch.label, masterAssociateList);
            currentSelAssoc = $scope.currentAssociateSelection;

            if(currentSelAssoc == null) {
                $scope.cardHidden = "none";
            }
            else if(currentSelAssoc != null){
                //staging area
                if(inArray(currentSelAssoc,$scope.stagedAssociates)==-1) {
                    if ($scope.stagedAssociates.length == 3) {
                        console.log("should pop here");
                        $scope.stagedAssociates.shift();
                    }
                    $scope.stagedAssociates.push($scope.currentAssociateSelection);
                    console.log($scope.stagedAssociates);
                    console.log($scope.stagedAssociates.length);

                    console.log($scope.stagedAssociates.length);
                    console.log($scope.stagedAssociates);
                }

                $scope.cardHidden = "block";
            }



        };

        $scope.selectSort = function(value)
        {
            currentSortSel = value;
            $scope.associate_data = createSortedTreeList(masterAssociateList, currentSortSel);
        };
        $scope.filterSort = function(search)
        {
            var index = 0;
            var tmpArray=[];
            var field="";

            for(index = 0; index < masterAssociateList.length; index++)
            {
                if(currentSortSel=="Name"){
                    field = masterAssociateList[index].name;
                }
                else if(currentSortSel=="Department"){
                    field = masterAssociateList[index].dept;
                }
                if(startsWith(search.toLowerCase(), field.toLowerCase()))
                {
                   tmpArray.push(masterAssociateList[index]);
                }
            }
            $scope.associate_data = createSortedTreeList(tmpArray, currentSortSel);
        };
        $scope.addAssociate = function(){
            if(inArray(currentSelAssoc,currentObjSel.associates)==-1 && currentSelAssoc!=null) {
                currentObjSel.associates.push(currentSelAssoc);
                currentSelAssoc.currLoad++;
            }
        };
        $scope.chooseCardClass = function(count){
            if(count <= 1) {
                return "cardGreen";
            }
            if(count <= 2){
                return "cardYellow";
            }
            return "cardRed";
        }
    });

function inArray(elem,array)
{
    var len = array.length;
    for(var i = 0 ; i < len;i++)
    {
        console.log(array[i]);
        console.log(elem);
        if(array[i] == elem){return i;}
    }
    return -1;
}