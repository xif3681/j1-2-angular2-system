import {Component, Input, Injectable, EventEmitter} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalContent, ModalContentNewUser, PaginationAdvanced, ModalContentEditUser} from '../../../../shared/index';
import {
  UserListService,
  DeleteUserService,
  UserStatusService,
  ItemUserService,
  PromptEmitService,
  UserCountService
} from '../../../../server/index';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'ar-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.css'],
  providers: [NgbAlertConfig, ModalContent, ModalContentNewUser, ModalContentEditUser,
    NgbActiveModal, PaginationAdvanced]
})

export class UserComponent {
  tHeadLicenceListNames = [
    '用户名',
    '显示名',
    '邮箱',
    '使用状态',
    '描述',
    '操作',
  ];
  error: any;
  userListAll: any[] = [];
  prompt: any;
  userCountMe: any;
  /**
   *
   * 分页初始信息
   */
  showCurPageNum: number = 10;
  showCurPage: number = 1;
  showPage: number = 1;

  constructor(public activeModal: NgbActiveModal,
              public userListService: UserListService, public modalService: NgbModal,
              public deleteUserService: DeleteUserService, public itemUserService: ItemUserService,
              public promptEmitService: PromptEmitService, public userCountService: UserCountService,
              public userStatusService: UserStatusService, private translate: TranslateService) {
  }

  /**
   * 初始的时候获取信息
   */

  ngOnInit() {
    this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
    this.getUserCountAll();
  }

  /**
   * 获取列表信息
   */
  getUserListAll(start, limit): void {
    this.userListService.getUserList(start, limit)
      .then(
        userListAll => {
          if (userListAll !== undefined) {
            this.userListAll = userListAll;
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
  getUserCountAll(): void {
    let me = this;
    this.userCountService.getUserCount()
      .then(
        userCount => {
          me.userCountMe = userCount.count;
        },
        error => {
          this.error = error;
        }
      )
  }

  /**
   * 跟改状态
   */
  stateChange(item) {
    let state;
    if (item.status) {
      state = 'disable';
    } else {
      state = 'enable';
    }
    let me = this;
    this.userStatusService.userStatusChange(item.userId, state)
      .then(
        userStatus => {
          if (userStatus !== undefined) {
            item.status = !item.status;
          }
        },
        error => {
          this.error = error;
        }
      )

  }

  /**
   * 添加用户
   */
  addUser() {
    let modalRef1 = this.modalService.open(ModalContentNewUser);
    modalRef1.componentInstance.title = '创建用户';
    modalRef1.result.then((result) => {
      if (result == 'success') {
        var me = this;
        me.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
        this.getUserCountAll();
      }
    }, (reason) => {
    });
  }

  /**
   * 编辑用户
   */
  editUser(item) {
    let modalRef3 = this.modalService.open(ModalContentEditUser);
    modalRef3.componentInstance.title = '编辑用户';
    modalRef3.componentInstance.body = item;
    modalRef3.result.then((result) => {
      if (result == 'success') {
        let me = this;
        this.itemUserService.infoItemUser(item.userId)
          .then(
            itemUser => {
              item.loginName = itemUser.loginName;
              item.displayName = itemUser.displayName;
              item.email = itemUser.email;
              item.status = itemUser.status;
              item.description = itemUser.description;
            },
            error => {
              me.error = error;
            }
          )
      }

    }, (reason) => {
    });
  }

  /**
   * 删除用户
   */
  delUser(item) {
    //1，弹框提示
    let modalDelRoll = this.modalService.open(ModalContent);
    modalDelRoll.componentInstance.title = '删除用户';
    modalDelRoll.componentInstance.body = '删除用户将导此用户无法登录，您确定要执行此操作吗？';
    modalDelRoll.result.then((result) => {
      //点击确定按钮的时候，发送删除请求
      if (result) {
        this.deleteUserService.deleteUser(item.userId)
          .then(
            deleteUserMe => {
              if (deleteUserMe !== undefined) {
                var me = this;
                // me.promptEmitService.change.emit('提示：删除用户成功');
                me.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
                this.getUserCountAll();
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

  //分页
  //选择每页显示的条数
  onCurPageNum(num): void {
    this.showCurPageNum = parseInt(num);
    //获取当前页显示的信息（后台获取）
    this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }

  //跳转至的页数
  onCurPage(num): void {
    this.showPage = parseInt(num);
    this.showCurPage = parseInt(num);
    this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }

  //点击显示的页数
  onPage(num): void {
    this.showPage = parseInt(num);
    this.showCurPage = parseInt(num);
    this.getUserListAll((this.showPage - 1) * this.showCurPageNum, this.showCurPageNum);
  }


}
