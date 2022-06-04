"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_main-menu_main-menu_module_ts"],{

/***/ 3126:
/*!*************************************************************!*\
  !*** ./src/app/pages/main-menu/main-menu-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenuPageRoutingModule": () => (/* binding */ MainMenuPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _main_menu_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-menu.page */ 9806);




const routes = [
    {
        path: '',
        component: _main_menu_page__WEBPACK_IMPORTED_MODULE_0__.MainMenuPage
    }
];
let MainMenuPageRoutingModule = class MainMenuPageRoutingModule {
};
MainMenuPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], MainMenuPageRoutingModule);



/***/ }),

/***/ 8768:
/*!*****************************************************!*\
  !*** ./src/app/pages/main-menu/main-menu.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenuPageModule": () => (/* binding */ MainMenuPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 5472);
/* harmony import */ var _main_menu_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-menu-routing.module */ 3126);
/* harmony import */ var _main_menu_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-menu.page */ 9806);







//import { ComponentsModule } from 'src/app/components/components.module';
let MainMenuPageModule = class MainMenuPageModule {
};
MainMenuPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _main_menu_routing_module__WEBPACK_IMPORTED_MODULE_0__.MainMenuPageRoutingModule,
            //ComponentsModule
        ],
        declarations: [_main_menu_page__WEBPACK_IMPORTED_MODULE_1__.MainMenuPage]
    })
], MainMenuPageModule);



/***/ }),

/***/ 9806:
/*!***************************************************!*\
  !*** ./src/app/pages/main-menu/main-menu.page.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainMenuPage": () => (/* binding */ MainMenuPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _main_menu_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main-menu.page.html?ngResource */ 3691);
/* harmony import */ var _main_menu_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-menu.page.scss?ngResource */ 1722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 5472);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ 7556);
/* harmony import */ var src_app_services_avatar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/avatar.service */ 5083);









let MainMenuPage = class MainMenuPage {
    constructor(router, avatarService, navController, loadingController, authService) {
        this.router = router;
        this.avatarService = avatarService;
        this.navController = navController;
        this.loadingController = loadingController;
        this.authService = authService;
        this.ruta = '';
        this.profile = null;
        this.avatarService.getUserProfile().subscribe((data) => {
            this.profile = data;
        });
    }
    ngOnInit() {
        this.presentLoading();
    }
    logout() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            yield this.authService.logout();
            this.router.navigateByUrl('login', { replaceUrl: true });
        });
    }
    //FUNCION QUE CARGA PAGINA
    presentLoading() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                cssClass: 'my-custom-class',
                message: 'Cargando...',
                duration: 1500,
                spinner: "bubbles"
            });
            yield loading.present();
            const { role, data } = yield loading.onDidDismiss();
            console.log('Loading dismissed!');
        });
    }
    //FUNCIONES NAVEGACION
    registraMascota() {
        this.router.navigate(['/registrar-mascota']);
        this.navController.navigateRoot('registrar-mascota');
    }
    home() {
        this.router.navigate(['/home']);
        this.navController.navigateRoot('home');
    }
};
MainMenuPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: src_app_services_avatar_service__WEBPACK_IMPORTED_MODULE_3__.AvatarService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.LoadingController },
    { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService }
];
MainMenuPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-main-menu',
        template: _main_menu_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_main_menu_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], MainMenuPage);



/***/ }),

/***/ 1722:
/*!****************************************************************!*\
  !*** ./src/app/pages/main-menu/main-menu.page.scss?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = ".avatar {\n  padding: 5px;\n  width: 150px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tbWVudS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtBQUNBIiwiZmlsZSI6Im1haW4tbWVudS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXZhdGFyIHtcclxucGFkZGluZzogNXB4O1xyXG53aWR0aDogMTUwcHg7XHJcbn0iXX0= */";

/***/ }),

/***/ 3691:
/*!****************************************************************!*\
  !*** ./src/app/pages/main-menu/main-menu.page.html?ngResource ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<ion-header class=\"ion-no-border\">\r\n  <ion-toolbar class=\"tema\">\r\n    <!-- <ion-button (click)=\"logout()\" class=\"tema\">\r\n      <ion-icon name=\"log-out\"></ion-icon>\r\n    </ion-button> -->\r\n    \r\n      <ion-avatar (click)=\"home()\" slot=\"end\">\r\n        <img *ngIf=\"profile?.imageUrl; else placeholder_avatar;\" [src]=\"profile.imageUrl\" class=\"avatar\"/>\r\n      </ion-avatar>\r\n      <ng-template #placeholder_avatar></ng-template>\r\n    \r\n    <ion-title>Menu</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding inihf\">\r\n  \r\n  <!--<ion-button expand=\"block\" (click)=\"tomarFoto()\">Tomar Foto</ion-button>\r\n  <ion-img [src]=\"ruta\"></ion-img>-->\r\n\r\n\r\n  <ion-slides pager=\"true\">\r\n    <ion-slide class=\"slide-1\">\r\n      <img src=\"assets/img/perro.jpg\" />\r\n    </ion-slide>\r\n\r\n    <ion-slide class=\"slide-2\">\r\n      <img src=\"assets/img/gato.jpg\" />\r\n      <h1></h1>\r\n    </ion-slide>\r\n\r\n    <ion-slide class=\"slide-3\">\r\n      <img src=\"assets/img/ambos.jpg\" />\r\n      <h1></h1>\r\n    </ion-slide>\r\n  </ion-slides>\r\n\r\n  \r\n\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" edge slot=\"fixed\">\r\n    <ion-fab-button color=\"success\" >\r\n      <ion-icon name=\"home\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n\r\n\r\n  <ion-fab vertical=\"bottom\" horizontal=\"start\" edge slot=\"fixed\">\r\n    <ion-fab-button color=\"tertiary\">\r\n      <ion-icon name=\"location\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n\r\n\r\n  <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\r\n    <ion-fab-button (click)=\"registraMascota()\" color=\"warning\">\r\n      <ion-icon name=\"paw\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n\r\n\r\n  <!-- <ion-fab vertical=\"bottom\" horizontal=\"center\" slot=\"fixed\">\r\n    <ion-fab-button color=\"danger\">\r\n      <ion-icon name=\"paw\"></ion-icon>\r\n    </ion-fab-button>\r\n    <ion-fab-list side=\"top\">\r\n      <ion-fab-button (click)=\"tomarFoto()\"><ion-icon name=\"camera\"></ion-icon></ion-fab-button>\r\n    </ion-fab-list>\r\n    <ion-fab-list side=\"start\">\r\n      <ion-fab-button><ion-icon name=\"location\"></ion-icon></ion-fab-button>\r\n    </ion-fab-list>\r\n    <ion-fab-list side=\"end\">\r\n      <ion-fab-button (click)=\"presentFicha()\"><ion-icon name=\"document-text\"></ion-icon></ion-fab-button>\r\n    </ion-fab-list>\r\n  </ion-fab> -->\r\n\r\n\r\n</ion-content>\r\n\r\n\r\n\r\n<ion-footer class=\"ion-no-border\">\r\n  <ion-toolbar class=\"tema\">\r\n    <ion-title ></ion-title>\r\n  </ion-toolbar>\r\n</ion-footer>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_main-menu_main-menu_module_ts.js.map