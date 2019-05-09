angular.module('app', [])

.controller('mainCtrl', function ($scope) {
  /*
   * Создаем список элементов
   */
  $scope.itemsList = [
    {'name': 'КФУ ИТИС 11-801','link':"/Universities/KFU/ITIS/11-801/index.html"},
    {'name': 'КФУ ИТИС 11-802','link':"/Universities/KFU/ITIS/11-802/index.html"},
    {'name': 'КФУ ИТИС 11-803','link':"/Universities/KFU/ITIS/11-803/index.html"},
    {'name': 'КФУ ИТИС 11-804','link':"/Universities/KFU/ITIS/11-804/index.html"},
    {'name': 'КФУ ИТИС 11-805','link':"/Universities/KFU/ITIS/11-805/index.html"},
    {'name': 'КФУ ИТИС 11-806','link':"/Universities/KFU/ITIS/11-806/index.html"},
    {'name': 'КФУ ИТИС 11-807','link':"/Universities/KFU/ITIS/11-807/index.html"},
    {'name': 'КФУ ИТИС 11-808','link':"/Universities/KFU/ITIS/11-808/index.html"},
    {'name': 'КФУ ИВМИТ 13-901'},
    {'name': 'КФУ ИВМИТ 13-822'},
    {'name': 'КФУ МЕХМАТ 8-201'},

  ];
})

/*
 * Объявляем директиву, которая будет создавать сам список
 */
.directive('dropdownList',function( $timeout ) {
  return {
    restrict: 'E',
    scope: {

      itemsList: '=',
      placeholder: '@'
    },
    template: '<input type="text" ng-model="search" placeholder="ВУЗ, факультет, группа" />' +
				'<div class="search-item-list"><ul class="list">' +
				'<li ng-repeat="item in itemsList | filter:search" ng-click="chooseItem( item )">{{ item.name }}' +
          '<span class="amount">{{ item.amount }}</span>' +
    		 '</li>' +
				'</ul></div>',
    link: function(scope, el, attr){
        var $listContainer = angular.element( el[0].querySelectorAll('.search-item-list')[0] );
        el.find('input').bind('focus',function(){
          $listContainer.addClass('show');
        });
        el.find('input').bind('blur',function(){
          /*
             * 'blur' реагирует быстрее чем ng-click,
             * поэтому без $timeout chooseItem не успеет поймать item до того, как лист исчезнет
             */
          $timeout(function(){ $listContainer.removeClass('show') }, 200);
        });
      
      	scope.chooseItem = function( item ){
				 scope.search = item.name;
           let url = item.link;
          console.log(url);
           window.location.href=url;
			 }
    }
  }
});