package com.bootdo.system.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2019-01-30 14:52:19
 */
public class StaffDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 员工编号
	private String employeeId;
	// 部门编号
	private String deptId;
	// 员工姓名
	private String employeename;
	// 员工状态，0在职，1离职
	private Integer estatus;
	// 性别，0男，1女
	private Integer sex;
	// 用户生日
	private String birthday;
	// Email
	private String email;
	// QQ
	private String qq;
	// 微信号
	private String wx;
	// 照片
	private String photo;
	// 手机号
	private String telphone;
	// 职称
	private String professionaltitle;
	// 学历
	private String educational;
	// 职务
	private String duty;
	// 编辑人
	private String editUser;
	// 编辑时间
	private Date editTime;
	// 删除标识，1未删除，2删除
	private Integer deleteflag;
	// 备注
	private String ext1;
	// 备注
	private String ext2;
	// 备注
	private String ext3;
	private String deptName;

	/**
	 * 设置：员工编号
	 */
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * 获取：员工编号
	 */
	public String getEmployeeId() {
		return employeeId;
	}

	/**
	 * 设置：部门编号
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	/**
	 * 获取：部门编号
	 */
	public String getDeptId() {
		return deptId;
	}

	/**
	 * 设置：员工姓名
	 */
	public void setEmployeename(String employeename) {
		this.employeename = employeename;
	}

	/**
	 * 获取：员工姓名
	 */
	public String getEmployeename() {
		return employeename;
	}

	/**
	 * 设置：员工状态，0在职，1离职
	 */
	public void setEstatus(Integer estatus) {
		this.estatus = estatus;
	}

	/**
	 * 获取：员工状态，0在职，1离职
	 */
	public Integer getEstatus() {
		return estatus;
	}

	/**
	 * 设置：性别，0男，1女
	 */
	public void setSex(Integer sex) {
		this.sex = sex;
	}

	/**
	 * 获取：性别，0男，1女
	 */
	public Integer getSex() {
		return sex;
	}

	/**
	 * 设置：用户生日
	 */
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	/**
	 * 获取：用户生日
	 */
	public String getBirthday() {
		return birthday;
	}

	/**
	 * 设置：Email
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * 获取：Email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * 设置：QQ
	 */
	public void setQq(String qq) {
		this.qq = qq;
	}

	/**
	 * 获取：QQ
	 */
	public String getQq() {
		return qq;
	}

	/**
	 * 设置：微信号
	 */
	public void setWx(String wx) {
		this.wx = wx;
	}

	/**
	 * 获取：微信号
	 */
	public String getWx() {
		return wx;
	}

	/**
	 * 设置：照片
	 */
	public void setPhoto(String photo) {
		this.photo = photo;
	}

	/**
	 * 获取：照片
	 */
	public String getPhoto() {
		return photo;
	}

	/**
	 * 设置：手机号
	 */
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	/**
	 * 获取：手机号
	 */
	public String getTelphone() {
		return telphone;
	}

	/**
	 * 设置：职称
	 */
	public void setProfessionaltitle(String professionaltitle) {
		this.professionaltitle = professionaltitle;
	}

	/**
	 * 获取：职称
	 */
	public String getProfessionaltitle() {
		return professionaltitle;
	}

	/**
	 * 设置：学历
	 */
	public void setEducational(String educational) {
		this.educational = educational;
	}

	/**
	 * 获取：学历
	 */
	public String getEducational() {
		return educational;
	}

	/**
	 * 设置：职务
	 */
	public void setDuty(String duty) {
		this.duty = duty;
	}

	/**
	 * 获取：职务
	 */
	public String getDuty() {
		return duty;
	}

	/**
	 * 设置：编辑人
	 */
	public void setEditUser(String editUser) {
		this.editUser = editUser;
	}

	/**
	 * 获取：编辑人
	 */
	public String getEditUser() {
		return editUser;
	}

	/**
	 * 设置：编辑时间
	 */
	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}

	/**
	 * 获取：编辑时间
	 */
	public Date getEditTime() {
		return editTime;
	}

	/**
	 * 设置：删除标识，1未删除，2删除
	 */
	public void setDeleteflag(Integer deleteflag) {
		this.deleteflag = deleteflag;
	}

	/**
	 * 获取：删除标识，1未删除，2删除
	 */
	public Integer getDeleteflag() {
		return deleteflag;
	}

	/**
	 * 设置：备注
	 */
	public void setExt1(String ext1) {
		this.ext1 = ext1;
	}

	/**
	 * 获取：备注
	 */
	public String getExt1() {
		return ext1;
	}

	/**
	 * 设置：备注
	 */
	public void setExt2(String ext2) {
		this.ext2 = ext2;
	}

	/**
	 * 获取：备注
	 */
	public String getExt2() {
		return ext2;
	}

	/**
	 * 设置：备注
	 */
	public void setExt3(String ext3) {
		this.ext3 = ext3;
	}

	/**
	 * 获取：备注
	 */
	public String getExt3() {
		return ext3;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
}
