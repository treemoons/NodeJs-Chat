
SELECT g.pay_no, --单据号
       g.COMPANY_CNAME, --账套
       g.PRIMARY_AMOUNT, --原币
       g.CURRENCY_CODE, -- 币种
       g.CRRN_RATE, --汇率
       g.RMB_AMT, --人民币 / 本币
       g.VOUCHER_NO, --凭证号
       g.VOUCHER_TEXT, --凭证内容
       g.Voucher_Date, --凭证日期
       g.USE_DEPT_ID CAPITAL_UNIT_CODE, --部门
       g.USE_USER_ID SUPPLIER_NAME, --供应商
       g.USE_USER_NAME APPLY_PERSON_NO, --供应商人工号码
       g.pay_date, --付款日期
       g.BANK_NAME bank_account_name, --付款银行
       g.bank_account, --付款银行账号
       g.pay_type, --付款类型 / 付款性质
       g.cash_flow_code, --现金流，报支类型
       g.expense_item_code --报支类型
  FROM (SELECT e.pay_no, --单据号
               e.COMPANY_CNAME, --账套
               e.PRIMARY_AMOUNT, --原币
               e.CURRENCY_CODE, -- 币种
               e.CRRN_RATE, --汇率
               e.RMB_AMT, --人民币 / 本币
               e.VOUCHER_NO, --凭证号
               e.VOUCHER_TEXT, --凭证内容
               e.Voucher_Date, --凭证日期
               f.USE_DEPT_ID, --部门
               f.USE_USER_ID, --供应商
               f.USE_USER_NAME, --供应商人工号码
               '' as pay_date, --付款日期
               e.BANK_NAME, --付款银行
               e.bank_account, --付款银行账号
               f.pay_type, --付款类型 / 付款性质
               f.cash_flow_code, --现金流，报支类型
               f.expense_item_code --报支类型
          FROM TFIAPMA35 e
          right join TFIAPMA36 f ON e.pay_no = f.pay_no) g
  left join TFIAPMA37 h ON h.pay_no = g.pay_no;
  SELECT * from (
       SELECT * from a WHERE
  )