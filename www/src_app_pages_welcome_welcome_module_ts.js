"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_welcome_welcome_module_ts"],{

/***/ 5247:
/*!*********************************************************!*\
  !*** ./src/app/pages/welcome/welcome-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomePageRoutingModule": () => (/* binding */ WelcomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome.page */ 8544);




const routes = [
    {
        path: '',
        component: _welcome_page__WEBPACK_IMPORTED_MODULE_0__.WelcomePage
    }
];
let WelcomePageRoutingModule = class WelcomePageRoutingModule {
};
WelcomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], WelcomePageRoutingModule);



/***/ }),

/***/ 2282:
/*!*************************************************!*\
  !*** ./src/app/pages/welcome/welcome.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomePageModule": () => (/* binding */ WelcomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 1777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 5472);
/* harmony import */ var _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome-routing.module */ 5247);
/* harmony import */ var _welcome_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.page */ 8544);







let WelcomePageModule = class WelcomePageModule {
};
WelcomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _welcome_routing_module__WEBPACK_IMPORTED_MODULE_0__.WelcomePageRoutingModule
        ],
        declarations: [_welcome_page__WEBPACK_IMPORTED_MODULE_1__.WelcomePage]
    })
], WelcomePageModule);



/***/ }),

/***/ 8544:
/*!***********************************************!*\
  !*** ./src/app/pages/welcome/welcome.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomePage": () => (/* binding */ WelcomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _welcome_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome.page.html?ngResource */ 9196);
/* harmony import */ var _welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.page.scss?ngResource */ 4552);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 5472);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5485);






let WelcomePage = class WelcomePage {
    constructor(router, navController) {
        this.router = router;
        this.navController = navController;
        //FUNCION SLIDES WELCOME PAGE
        this.slides = [
            {
                img: 'assets/img/mascota.png',
                titulo: 'Ayuda!<br>Rescatando de las calles<br>Una mascota abandonada'
            },
            {
                img: 'assets/img/house.png',
                titulo: 'Puedes llevarlo a un<br>Hogar temporal<br>Mas cercano'
            },
            {
                img: 'assets/img/adopta.png',
                titulo: 'Adopta!<br>Entregale amor y<br>Dale un hogar definitivo'
            }
        ];
    }
    ngOnInit() {
    }
    //FUNCIONES NAVEGACION
    comenzar() {
        this.router.navigate(['/login']);
        this.navController.navigateRoot('login');
    }
};
WelcomePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.NavController }
];
WelcomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-welcome',
        template: _welcome_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_welcome_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], WelcomePage);



/***/ }),

/***/ 4552:
/*!************************************************************!*\
  !*** ./src/app/pages/welcome/welcome.page.scss?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "/* CSS SLIDES*/\nion-slide {\n  display: block;\n}\nh3 {\n  font-size: 40;\n  margin-bottom: 60px;\n}\n.slide-img-padding {\n  padding: 10px;\n}\nion-grid {\n  margin-bottom: 20px;\n}\nion-slides {\n  --bullet-background: #CED1DF;\n  --bullet-background-active: #8890B2;\n}\n.cta {\n  position: relative;\n  margin: auto;\n  padding: 12px 18px;\n  transition: all 0.2s ease;\n  border: none;\n  background: none;\n}\n.cta:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  border-radius: 50px;\n  background: #b1dae7;\n  width: 45px;\n  height: 45px;\n  transition: all 0.3s ease;\n}\n.cta span {\n  position: relative;\n  font-size: 20px;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  color: #234567;\n}\n.cta svg {\n  position: relative;\n  top: 0;\n  margin-left: 10px;\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke: #234567;\n  stroke-width: 2;\n  transform: translateX(-5px);\n  transition: all 0.3s ease;\n}\n.cta:hover:before {\n  width: 100%;\n  background: #b1dae7;\n}\n.cta:hover svg {\n  transform: translateX(0);\n}\n.cta:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlbGNvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQUE7QUFDQTtFQUNJLGNBQUE7QUFDSjtBQUVBO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0FBQ0o7QUFFQTtFQUNJLGFBQUE7QUFDSjtBQUVBO0VBQ0ksbUJBQUE7QUFDSjtBQUVBO0VBQ0ksNEJBQUE7RUFDQSxtQ0FBQTtBQUNKO0FBS0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBRko7QUFLRztFQUNDLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FBRko7QUFLRztFQUNDLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FBRko7QUFLRztFQUNDLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0VBQ0EseUJBQUE7QUFGSjtBQUtHO0VBQ0MsV0FBQTtFQUNBLG1CQUFBO0FBRko7QUFLRztFQUNDLHdCQUFBO0FBRko7QUFLRztFQUNDLHNCQUFBO0FBRkoiLCJmaWxlIjoid2VsY29tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDU1MgU0xJREVTKi9cclxuaW9uLXNsaWRlIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG5oMyB7XHJcbiAgICBmb250LXNpemU6IDQwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNjBweDtcclxufVxyXG5cclxuLnNsaWRlLWltZy1wYWRkaW5nIHtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbn1cclxuXHJcbmlvbi1ncmlkIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbmlvbi1zbGlkZXMge1xyXG4gICAgLS1idWxsZXQtYmFja2dyb3VuZDogI0NFRDFERjtcclxuICAgIC0tYnVsbGV0LWJhY2tncm91bmQtYWN0aXZlOiAjODg5MEIyO1xyXG59XHJcblxyXG5cclxuXHJcbi8vIENTUyBCT1RPTiBDT01FTlpBUlxyXG4uY3RhIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmc6IDEycHggMThweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICB9XHJcbiAgIFxyXG4gICAuY3RhOmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcclxuICAgIGJhY2tncm91bmQ6ICNiMWRhZTc7XHJcbiAgICB3aWR0aDogNDVweDtcclxuICAgIGhlaWdodDogNDVweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgIH1cclxuICAgXHJcbiAgIC5jdGEgc3BhbiB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDVlbTtcclxuICAgIGNvbG9yOiAjMjM0NTY3O1xyXG4gICB9XHJcbiAgIFxyXG4gICAuY3RhIHN2ZyB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgIGZpbGw6IG5vbmU7XHJcbiAgICBzdHJva2UtbGluZWNhcDogcm91bmQ7XHJcbiAgICBzdHJva2UtbGluZWpvaW46IHJvdW5kO1xyXG4gICAgc3Ryb2tlOiAjMjM0NTY3O1xyXG4gICAgc3Ryb2tlLXdpZHRoOiAyO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01cHgpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxuICAgfVxyXG4gICBcclxuICAgLmN0YTpob3ZlcjpiZWZvcmUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjYjFkYWU3O1xyXG4gICB9XHJcbiAgIFxyXG4gICAuY3RhOmhvdmVyIHN2ZyB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XHJcbiAgIH1cclxuICAgXHJcbiAgIC5jdGE6YWN0aXZlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XHJcbiAgIH1cclxuXHJcbiAgIFxyXG4iXX0= */";

/***/ }),

/***/ 9196:
/*!************************************************************!*\
  !*** ./src/app/pages/welcome/welcome.page.html?ngResource ***!
  \************************************************************/
/***/ ((module) => {

module.exports = "<ion-content class=\"tema\"> \r\n  \r\n  <ion-slides pager=\"true\">\r\n\r\n    <ion-slide *ngFor=\"let slide of slides\" text-center>\r\n\r\n      <div class=\"slide-img-padding\">\r\n        <img [src]=\"slide.img\">\r\n      </div>\r\n      <div>\r\n        <h3 [innerHTML]=\"slide.titulo\" ></h3>\r\n      </div>  \r\n\r\n    </ion-slide>\r\n\r\n  </ion-slides>\r\n\r\n</ion-content>\r\n\r\n\r\n<ion-footer class=\"ion-no-border\">\r\n\r\n  <ion-toolbar class=\"tema\">\r\n    <ion-grid>\r\n      <ion-row>\r\n        <button (click)=\"comenzar()\" class=\"cta\">\r\n          <span>Comenzar</span>\r\n          <svg viewBox=\"0 0 13 10\" height=\"10px\" width=\"15px\">\r\n            <path d=\"M1,5 L11,5\"></path>\r\n            <polyline points=\"8 1 12 5 8 9\"></polyline>\r\n          </svg>\r\n        </button>\r\n      </ion-row>\r\n    </ion-grid>\r\n  </ion-toolbar>\r\n    \r\n</ion-footer>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_welcome_welcome_module_ts.js.map