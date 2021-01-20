select COST.mat_name,
       'KD2004' REC_CREATOR,
       '20201229153330' REC_CREATE_TIME,
       '202101' ACCOUNT_PERIOD,
       COST.ARCHIVE_FLAG,
       'QA01' COMPANY_CODE,
       '青岛特殊钢铁有限公司' COMPANY_CNAME,
       (SALE.PRODUCT_PRICE - COST.PRODUCT_PRICE) PRODUCT_PRICE,
       COST.PROC_CODE,
       COST.VARIETY_CODE,
       COST.SG_CODE,
       COST.SPEC,
       COST.SG_STD,
       'A' ARCHIVE_FLAG,
       sys_guid() ROW_GUID
  from (select P.archive_flag,
               p.ACCOUNT_PERIOD,
               p.mat_name,
               p.PRODUCT_PRICE,
               p.PROC_CODE,
               p.VARIETY_CODE,
               p.SG_CODE,
               p.SPEC,
               p.SG_STD
          from (select P.archive_flag,
                       p.ACCOUNT_PERIOD,
                       p.mat_name,
                       p.output,
                       s.PRODUCT_PRICE,
                       p.PROC_CODE,
                       p.VARIETY_CODE,
                       p.SG_CODE,
                       p.SPEC,
                       p.SG_STD
                  from (select mat_name,
                               sum(output) output,
                               0 PRODUCT_PRICE,
                               PROC_CODE,
                               VARIETY_CODE,
                               SG_CODE,
                               SPEC,
                               SG_STD,
                               ACCOUNT_PERIOD,
                               archive_flag
                          from TACACJXP6
                         where 1 = 1
                           and archive_flag = 'A'
                           and ACCOUNT_PERIOD = '202101'
                         group by mat_name,
                                  VARIETY_CODE,
                                  PROC_CODE,
                                  SG_CODE,
                                  SPEC,
                                  SG_STD,
                                  archive_flag,
                                  ACCOUNT_PERIOD) p
                 inner join (select mat_name,
                                   0 output,
                                   sum(PRODUCT_PRICE) PRODUCT_PRICE,
                                   PROC_CODE,
                                   VARIETY_CODE,
                                   SG_CODE,
                                   SPEC,
                                   SG_STD
                              from TACACJXP6
                             group by mat_name,
                                      VARIETY_CODE,
                                      PROC_CODE,
                                      SG_CODE,
                                      SPEC,
                                      SG_STD) s on s.VARIETY_CODE =
                                                   p.VARIETY_CODE
                                               AND s.SG_CODE = p.SG_CODE
                                               AND s.SPEC = p.SPEC
                                               AND s.SG_STD = p.SG_STD
                                               AND s.PROC_CODE = p.PROC_CODE) p
         where 1 = 1
           and p.mat_name not in
               (select mat.mat_name
                  from (select '' mat_name,
                               0 output,
                               0 PRODUCT_PRICE,
                               '' PROC_CODE,
                               '' VARIETY_CODE,
                               '' SG_CODE,
                               '' SPEC,
                               '' SG_STD,
                               ACCOUNT_PERIOD,
                               '' archive_flag
                          from TACACJXP6
                         where 1 = 0) mat)
        union all
        select b.archive_flag,
               b.ACCOUNT_PERIOD,
               b.mat_name,
               b.PRODUCT_PRICE,
               b.PROC_CODE,
               b.VARIETY_CODE,
               b.SG_CODE,
               b.SPEC,
               b.SG_STD
          from (select '' mat_name,
                       0 output,
                       0 PRODUCT_PRICE,
                       '' PROC_CODE,
                       '' VARIETY_CODE,
                       '' SG_CODE,
                       '' SPEC,
                       '' SG_STD,
                       ACCOUNT_PERIOD,
                       '' archive_flag
                  from TACACJXP6
                 where 1 = 0) b
         where 1 = 1
           and b.mat_name not in
               (select mat.mat_name
                  from (select P.archive_flag,
                               p.ACCOUNT_PERIOD,
                               p.mat_name,
                               p.output,
                               s.PRODUCT_PRICE,
                               p.PROC_CODE,
                               p.VARIETY_CODE,
                               p.SG_CODE,
                               p.SPEC,
                               p.SG_STD
                          from (select mat_name,
                                       sum(output) output,
                                       0 PRODUCT_PRICE,
                                       PROC_CODE,
                                       VARIETY_CODE,
                                       SG_CODE,
                                       SPEC,
                                       SG_STD,
                                       ACCOUNT_PERIOD,
                                       archive_flag
                                  from TACACJXP6
                                 where 1 = 1
                                   and archive_flag = 'A'
                                   and ACCOUNT_PERIOD = '202101'
                                 group by mat_name,
                                          VARIETY_CODE,
                                          PROC_CODE,
                                          SG_CODE,
                                          SPEC,
                                          SG_STD,
                                          archive_flag,
                                          ACCOUNT_PERIOD) p
                         inner join (select mat_name,
                                           0 output,
                                           sum(PRODUCT_PRICE) PRODUCT_PRICE,
                                           PROC_CODE,
                                           VARIETY_CODE,
                                           SG_CODE,
                                           SPEC,
                                           SG_STD
                                      from TACACJXP6
                                     group by mat_name,
                                              VARIETY_CODE,
                                              PROC_CODE,
                                              SG_CODE,
                                              SPEC,
                                              SG_STD) s on s.VARIETY_CODE =
                                                           p.VARIETY_CODE
                                                       AND s.SG_CODE =
                                                           p.SG_CODE
                                                       AND s.SPEC = p.SPEC
                                                       AND s.SG_STD = p.SG_STD
                                                       AND s.PROC_CODE =
                                                           p.PROC_CODE) mat)
        union all
        select P.archive_flag,
               p.ACCOUNT_PERIOD,
               p.mat_name,
               ((b.PRODUCT_PRICE * b.output + p.PRODUCT_PRICE * p.output) /
               (b.output + p.output)) as PRODUCT_PRICE,
               p.PROC_CODE,
               p.VARIETY_CODE,
               p.SG_CODE,
               p.SPEC,
               p.SG_STD
          from (select P.archive_flag,
                       p.ACCOUNT_PERIOD,
                       p.mat_name,
                       p.output,
                       s.PRODUCT_PRICE,
                       p.PROC_CODE,
                       p.VARIETY_CODE,
                       p.SG_CODE,
                       p.SPEC,
                       p.SG_STD
                  from (select mat_name,
                               sum(output) output,
                               0 PRODUCT_PRICE,
                               PROC_CODE,
                               VARIETY_CODE,
                               SG_CODE,
                               SPEC,
                               SG_STD,
                               ACCOUNT_PERIOD,
                               archive_flag
                          from TACACJXP6
                         where 1 = 1
                           and archive_flag = 'A'
                           and ACCOUNT_PERIOD = '202101'
                         group by mat_name,
                                  VARIETY_CODE,
                                  PROC_CODE,
                                  SG_CODE,
                                  SPEC,
                                  SG_STD,
                                  archive_flag,
                                  ACCOUNT_PERIOD) p
                 inner join (select mat_name,
                                   0 output,
                                   sum(PRODUCT_PRICE) PRODUCT_PRICE,
                                   PROC_CODE,
                                   VARIETY_CODE,
                                   SG_CODE,
                                   SPEC,
                                   SG_STD
                              from TACACJXP6
                             group by mat_name,
                                      VARIETY_CODE,
                                      PROC_CODE,
                                      SG_CODE,
                                      SPEC,
                                      SG_STD) s on s.VARIETY_CODE =
                                                   p.VARIETY_CODE
                                               AND s.SG_CODE = p.SG_CODE
                                               AND s.SPEC = p.SPEC
                                               AND s.SG_STD = p.SG_STD
                                               AND s.PROC_CODE = p.PROC_CODE) p
         inner join (select '' mat_name,
                            0 output,
                            0 PRODUCT_PRICE,
                            '' PROC_CODE,
                            '' VARIETY_CODE,
                            '' SG_CODE,
                            '' SPEC,
                            '' SG_STD,
                            ACCOUNT_PERIOD,
                            '' archive_flag
                       from TACACJXP6
                      where 1 = 0) b on b.VARIETY_CODE = p.VARIETY_CODE
                                    AND b.SG_CODE = p.SG_CODE
                                    AND b.SPEC = p.SPEC
                                    AND b.SG_STD = p.SG_STD
                                    AND b.PROC_CODE = p.PROC_CODE) COST
 INNER JOIN (select PROC_CODE,
                    VARIETY_CODE,
                    SG_CODE,
                    SPEC,
                    SG_STD,
                    sum(PRODUCT_PRICE) as PRODUCT_PRICE
               from TACACJXsP6
              where 1 = 1
                and archive_flag = 'A'
                and ACCOUNT_PERIOD = '202101'
              group by mat_name,
                       VARIETY_CODE,
                       PROC_CODE,
                       SG_CODE,
                       SPEC,
                       SG_STD,
                       archive_flag) SALE ON COST.VARIETY_CODE =
                                             SALE.VARIETY_CODE
                                         AND COST.SG_CODE = SALE.SG_CODE
                                         AND COST.SPEC = SALE.SPEC
                                         AND COST.SG_STD = SALE.SG_STD
                                         AND COST.PROC_CODE =
                                             SALE.PROC_CODE
