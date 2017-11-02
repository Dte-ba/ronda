'use strict';

export default angular
    .module('ronda-ui.components.waterfall', [])
    .directive('rdWaterfall', rdWaterfall)
    .name;

const DEFAULT_COLUMNS_SIZE = 5;

class RdWaterfallController {
    /*@ngInject*/
    constructor($scope, $element, $timeout, $compile, $attrs, $transclude, $mdMedia, $window){
			this.$scope = $scope;
			this.$element = $element;
			this.$timeout = $timeout;
			this.$attrs = $attrs;
			this.$compile = $compile;
			this.$transclude = $transclude;
			this.$window = $window;
			this.$mdMedia = $mdMedia;
			this.$wrapperElement = this.$element.find('.rd-waterfall-wrapper');
			this.$columns = [];
			this.$templ = angular.element(this.$attrs.itemTemplate);
			this.columnsSizes = {};
			this.lastColumn_ = null;
			this.items = [];

			this.$element.addClass('rd-waterfall');
			this.initColumnsSizes_();

			// init
			for (var i=0; i < 15; i++){
				this.items.push({ id: i, color: this.randomColor() });
			}
			let counter = this.items.length;
			//setInterval(() => {
			//	this.items.push(counter++);
			//	this.$scope.$apply();
			//}, 3000);
    }

		initColumnsSizes_(){
			// init breakpoints
			let abks = { };
			for (var aname in this.$attrs.$attr){
				let htag = this.$attrs.$attr[aname];
				if (/^columns\-?/i.test(htag)) {
					abks[htag] = this.$attrs[aname]
				}
			}
			this.columnsSizes['columns'] = parseInt(abks['columns']) || DEFAULT_COLUMNS_SIZE;
			let bks = ["xs", "sm", "md", "lg", "xl"];

			bks.forEach(b => {
				if (abks[`columns-${b}`]){
					this.columnsSizes[b] = parseInt(abks[`columns-${b}`]) || this.columnsSizes['columns'];
				}
				if (abks[`columns-gt-${b}`]){
					this.columnsSizes[`gt-${b}`] = parseInt(abks[`columns-gt-${b}`]) || this.columnsSizes['columns'];
				}
			});
		}

    columnSize_(){
			for (var media in this.columnsSizes){
				if (this.$mdMedia(media))
					return this.columnsSizes[media];
			}
			return this.columnsSizes['columns'];
    }

    render_(force){
			let csize = this.columnSize_();
			if (this.lastColumn_ === csize || (this.rendering_ && !force)) 
				return;

			console.log('rendering...');
				
			this.rendering_ = true;
			this.lastColumn_ = csize;
			this.$wrapperElement.empty();
			// create the columns
			let flex = Math.floor(100/csize);
			for (var c=0; c < this.columnSize_();c++){
				this.$columns[c] = this.$compile(angular.element(`<div layout="column" layout-align="start stretch" flex="${flex}"></div>`))(this.$scope);
				this.$columns[c].$colIndex = c;
				this.$wrapperElement.append(this.$columns[c]);
			}

			for (var i = 0; i < this.items.length; i++) {
				let item = this.items[i];
				item.$index = i;
				item.$colIndex = i % this.columnSize_();
				let childScope = this.$scope.$new(false);
				childScope.item=item;
				let clone = this.$templ.clone();
				//
				let h = Math.floor((Math.random() * 200) + 30);
				//let lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
				//clone.append(`${lorem}`);
				if(this.$templ[0].srcHTML){
				clone[0].innerHTML = this.$templ[0].srcHTML;
				}
				let el = this.$compile(clone)(childScope);
				this.$columns[item.$colIndex].append(el);
			}

			this.rendering_ = false;
    }

    $onInit(){
			this.render_();

			$(this.$window).resize(() => {
				this.render_();
			});
		}
		
		loadingIsVisible() {
			return this.rendering_;
		}

    randomColor(){
			return ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    }
}

function rdWaterfall(){
    'ngInject';

    return {
			restrict: 'E',
			controllerAs: '$rdWaterfallCtrl',
			controller: RdWaterfallController,
			template: (element, attr) => {
				attr.itemTemplate    = getItemTemplate();
				return `
				<md-progress-linear class="'md-inline'" ng-if="$rdWaterfallCtrl.loadingIsVisible()" md-mode="indeterminate"></md-progress-linear>
				<div class="rd-waterfall-wrapper" layout="row" layout-padding></div>`;

				// helpers
			function getItemTemplate() {
					var templateTag = element.find('rd-item-template').detach(),
					html = templateTag.length ? templateTag.html() : element.html();
					let $templ = angular.element(`<div class="rd-waterfall-item">${html}</rd-waterfall-item>`);
					// copy attributes
					if (templateTag.length){
							let $templOne = templateTag[0];

							for (var i =0; i<$templOne.attributes.length; i++){
									let a = $templOne.attributes[i];
									if (/class/i.test(a.name)){
												$templ.addClass(a.value);
									} else {
											$templ.attr(a.name, a.value);
									}
							}
					}

					if (!templateTag.length) element.empty();
					return $templ;
				}
			}
    };
}