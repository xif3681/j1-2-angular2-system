import {Component, Input, Injectable, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {
  ModalContent,
  ModalContentActiveCode,
  ModalContentNewCode,
  ModalContentQrcode,
  PaginationAdvanced,
  QRCodeComponent
} from '../../../../shared/index';
import {
  OverviewService,
  KittencupService,
  LicenceListService,
  ProductInfoServer,
  DelLicenceService,
  LicenceCountService
} from '../../../../server/index';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  moduleId: module.id,
  selector: 'ar-licence-list',
  templateUrl: 'licence-list.component.html',
  styleUrls: ['licence-list.component.css'],
  directives: [QRCodeComponent],
  providers: [NgbAlertConfig, ModalContent, ModalContentActiveCode, ModalContentNewCode,
    ModalContentQrcode, NgbActiveModal, PaginationAdvanced]
})
export class LicenceListComponent {
  tHeadLicenceListNames = [
    '',
    '授权码',
    '类型',
    '有效期',
    '授权流量',
    '状态',
    '操作'
  ];

  licenceListAll: any[] = [];
  error: any;
  licenseCountMe: any;

  prompt: any;
  overviewAll: any;
  productInfo: any;
  /**
   *
   * 分页初始信息
   */
  showCurPageNum: number = 10;
  showCurPage: number = 1;
  showPage: number = 1;

  constructor(public kittencupService: KittencupService, private overviewService: OverviewService,
              public activeModal: NgbActiveModal, public licenceListService: LicenceListService,
              public modalService: NgbModal, public delLicenceService: DelLicenceService,
              public licenceCountService: LicenceCountService, private productInfoServer: ProductInfoServer) {
    /**
     * 初始的时候获取信息
     */
    this.getLicenseCountAll();
    this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    this.getOverviewAll();
    this.getproductInfoMsg();
  }

  /**
   * 获取许可证统计信息
   */
  getOverviewAll(): any {
    this.overviewService.getOverview()
      .then(
        overviews => {
          this.overviewAll = overviews;
          this.kittencupService.change.emit(overviews);
        },
        error => {
          this.error = error;
        }
      )
  }

  /**
   * 获取产品信息，底部显示
   */
  getproductInfoMsg(): void {
    this.productInfoServer.getproductInfo()
      .then(
        productInfo => {
          this.productInfo = productInfo;
          //获取到之后，跟新
          this.productInfoServer.change.emit(productInfo);

        },
        error => {
          this.error = error;
        }
      )

  }

  /**
   * 获取列表信息
   * @param start 开始数
   * @param limit 每页显示的条数
   */

  getLicenceListAll(start, limit): void {
    this.licenceListService.getLicenceList(start, limit)
      .then(
        licenceListAll => {
          if (licenceListAll == '') {
            this.licenceListAll = [];
          } else if (licenceListAll) {
            licenceListAll.map(function (obj) {
              obj.licenceDetail = 'hide';
              obj.faCaretType = 'fa-caret-right';
            });
            this.licenceListAll = licenceListAll;
          }
        },
        error => {
          this.error = error;
        }
      );
  }

  /**
   * 获取总数
   */
  getLicenseCountAll(): void {
    let me = this;
    this.licenceCountService.getLicenseCount()
      .then(
        licenseCount => {
          me.licenseCountMe = licenseCount.count;
        },
        error => {
          this.error = error;
        }
      )
  }

  /**
   * 添加授权码
   */
  addCode() {
    let modalRef1 = this.modalService.open(ModalContentNewCode);
    modalRef1.componentInstance.title = '添加授权码';
    modalRef1.componentInstance.body = '请输入您要添加的授权码，多个授权码以回车键隔开：';
    modalRef1.result.then((result) => {
      //点击确定取消按钮，重新获取列表信息
      this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
      this.getLicenseCountAll();
      this.getOverviewAll();
      this.getproductInfoMsg();
    }, (reason) => {
      //点击添加按钮，重新获取列表信息
      this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
      this.getLicenseCountAll();
      this.getOverviewAll();
      this.getproductInfoMsg();
    });
  }

  /**
   * 查看机器码
   */
  seeCode() {
    let modalRef2 = this.modalService.open(ModalContentQrcode);
    modalRef2.componentInstance.title = '查看机器码';
  }

  /**
   * 激活授权码
   */
  actCode(item) {
    let modalRef3 = this.modalService.open(ModalContentActiveCode);
    modalRef3.componentInstance.title = '激活授权码';
    modalRef3.componentInstance.body = '请输入授权码对应的激活码';
    modalRef3.componentInstance.serial = item.serial;
    modalRef3.componentInstance.machineCode = item.machineCode;
    modalRef3.result.then((result) => {
      //点击添加按钮，重新获取列表信息
      if (result) {
        this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
        this.getOverviewAll();
        this.getproductInfoMsg();
      }
    }, (reason) => {
    });
  }

  /**
   * 删除授权码
   */
  delCode(item) {
    //0,2,3直接删除
    if (item.status == 0 || item.status == 2 || item.status == 3) {
      this.delLicenceService.delLicence(item.serial)
        .then(
          delLicenceMe => {
            if (delLicenceMe !== undefined) {
              this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
              this.getLicenseCountAll();
              this.getOverviewAll();
              this.getproductInfoMsg();
            }
          },
          error => {
            this.error = error;
          }
        );
    } else if (item.status == 1) {
      //1，弹框提示
      let modalRef4 = this.modalService.open(ModalContent);
      modalRef4.componentInstance.title = '删除授权码';
      if (item.type == 'test') {
        modalRef4.componentInstance.body = '删除该授权码将导致产品授权失效，您确定要执行此操作吗？';
      }
      else if (item.type == 'daily' || item.type == 'datanode') {
        modalRef4.componentInstance.body = '删除该授权码将导致已授权的代理失效，您确定要执行此操作吗？';
      }
      else if (item.type == 'base') {
        modalRef4.componentInstance.body = '删除该授权码将导致产品授权全部失效，您确定要执行此操作吗？';
      }
      modalRef4.result.then((result) => {
        //点击确定按钮的时候，发送删除请求
        if (result) {
          this.delLicenceService.delLicence(item.serial)
            .then(
              delLicenceMe => {
                if (delLicenceMe !== undefined) {
                  this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
                  this.getLicenseCountAll();
                  this.getOverviewAll();
                  this.getproductInfoMsg();
                }
              },
              error => {
                this.error = error;
              }
            );
        }
      }, (reason) => {
        return;
      });
    }
  }

  //分页
  //选择每页显示的条数
  onCurPageNum(num): void {
    this.showCurPageNum = parseInt(num);
    //获取当前页显示的信息（后台获取）
    this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }

  //跳转至的页数
  onCurPage(num): void {
    this.showPage = parseInt(num);
    this.showCurPage = parseInt(num);
    this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }

  //点击显示的页数
  onPage(num): void {
    this.showPage = parseInt(num);
    this.showCurPage = parseInt(num);

    this.getLicenceListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }

  //点击出现授权码的详情
  toggleLicenceDetail(item) {
    if (item.faCaretType == 'fa-caret-down' || item.faCaretType == undefined) {
      item.faCaretType = 'fa-caret-right'
    } else {
      item.faCaretType = 'fa-caret-down'
    }
    if (item.licenceDetail == 'show' || item.licenceDetail == undefined) {
      item.licenceDetail = 'hide'
    } else {
      item.licenceDetail = 'show'
    }
  }

}
