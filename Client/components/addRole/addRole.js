angular
        .module("app.addRole",[])

        .controller("AddRoleController",[AddRoleController]);

        function AddRoleController() {
          var _self = this;
          _self.role = [];
         _self.nonSelectedArray = ["Users","Roles","Dashboard","Franchise","Memberships","Show All Memberships","Flight","Accommodation","Cars"];
        _self.selectedArray = [];
        // Add One item  from non selected

        _self.selectedRoleItem = function(role){
            _self.selectedRole = role;
        };

        // Add One item  from selected
        _self.nonselectedRoleItem = function(selectedrole){
            _self.nonselectedRole = selectedrole;
        };

       // move One item  from non selected to selected Array
        _self.moveSingleRole = function(){
            _self.selectedArray.push(_self.selectedRole);
            _self.nonSelectedArray.splice(_self.nonSelectedArray.indexOf(_self.selectedRole), 1);
        };

          // move One item  from selected to non selected Array
        _self.moveNonSelectedSingleRole = function(){
            _self.nonSelectedArray.push(_self.nonselectedRole);
            _self.selectedArray.splice(_self.selectedArray.indexOf(_self.nonselectedRole), 1);
            console.log( _self.nonSelectedArray);
        };
           // move all item  from selected to non selected Array

        _self.moveNonSelectedAllRoles = function(){
            _self.selectedArray.forEach(function(v, i){
                _self.nonSelectedArray.push(v);
        });
             _self.selectedArray = [];
     };
       // move all item  from non selected to selected Array

        _self.moveAllRoles = function(){
            _self.nonSelectedArray.forEach(function(v, i){
                _self.selectedArray.push(v);
        });
             _self.nonSelectedArray = [];
     };


        }
