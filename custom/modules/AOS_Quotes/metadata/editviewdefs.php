<?php
$module_name = 'AOS_Quotes';
$_object_name = 'aos_quotes';
$viewdefs [$module_name] = 
array (
  'EditView' => 
  array (
    'templateMeta' => 
    array (
      'form' => 
      array (
        'buttons' => 
        array (
          0 => 'SAVE',
          1 => 'CANCEL',
        ),
      ),
      'maxColumns' => '2',
      'widths' => 
      array (
        0 => 
        array (
          'label' => '10',
          'field' => '30',
        ),
        1 => 
        array (
          'label' => '10',
          'field' => '30',
        ),
      ),
      'useTabs' => true,
      'tabDefs' => 
      array (
        'LBL_ACCOUNT_INFORMATION' => 
        array (
          'newTab' => true,
          'panelDefault' => 'expanded',
        ),
        'LBL_EDITVIEW_PANEL4' => 
        array (
          'newTab' => true,
          'panelDefault' => 'expanded',
        ),
        'LBL_EDITVIEW_PANEL1' => 
        array (
          'newTab' => true,
          'panelDefault' => 'expanded',
        ),
        'LBL_EDITVIEW_PANEL3' => 
        array (
          'newTab' => true,
          'panelDefault' => 'expanded',
        ),
        'LBL_EDITVIEW_PANEL2' => 
        array (
          'newTab' => true,
          'panelDefault' => 'expanded',
        ),
      ),
      'syncDetailEditViews' => true,
    ),
    'panels' => 
    array (
      'lbl_account_information' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'name',
            'displayParams' => 
            array (
              'required' => true,
            ),
            'label' => 'LBL_NAME',
          ),
          1 => 
          array (
            'name' => 'document_number_c',
            'label' => 'LBL_DOCUMENT_NUMBER',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'quote_type',
            'studio' => 'visible',
            'label' => 'LBL_QUOTE_TYPE',
          ),
          1 => 
          array (
            'name' => 'data_doc_c',
            'label' => 'LBL_DATA_DOC',
          ),
        ),
      ),
      'lbl_editview_panel4' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'cases_aos_quotes_1_name',
          ),
          1 => 
          array (
            'name' => 'ras_status_hint_c',
            'studio' => 'visible',
            'label' => 'LBL_RAS_STATUS_HINT',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'workhours_c',
            'label' => 'LBL_WORKHOURS',
          ),
          1 => '',
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'machine_name_c',
            'label' => 'LBL_MACHINE_NAME',
          ),
          1 => '',
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'machine_part_number_c',
            'label' => 'LBL_MACHINE_PART_NUMBER',
          ),
          1 => 
          array (
            'name' => 'machine_workhours_c',
            'label' => 'LBL_MACHINE_WORKHOURS',
          ),
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'description',
            'comment' => 'Full text of the note',
            'label' => 'LBL_DESCRIPTION',
          ),
          1 => 
          array (
            'name' => 'notes_internal_c',
            'studio' => 'visible',
            'label' => 'LBL_NOTES_INTERNAL',
          ),
        ),
        5 => 
        array (
          0 => 
          array (
            'name' => 'collaudo_c',
            'studio' => 'visible',
            'label' => 'LBL_COLLAUDO',
          ),
          1 => 
          array (
            'name' => 'controllisicurezza_c',
            'studio' => 'visible',
            'label' => 'LBL_CONTROLLISICUREZZA',
          ),
        ),
      ),
      'lbl_editview_panel1' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'line_items',
            'label' => 'LBL_LINE_ITEMS',
          ),
        ),
      ),
      'lbl_editview_panel3' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'opportunity',
            'label' => 'LBL_OPPORTUNITY',
          ),
          1 => 
          array (
            'name' => 'stage',
            'label' => 'LBL_STAGE',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'total_amt',
            'label' => 'LBL_TOTAL_AMT',
          ),
          1 => 
          array (
            'name' => 'subtotal_amount',
            'label' => 'LBL_SUBTOTAL_AMOUNT',
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'discount_amount',
            'label' => 'LBL_DISCOUNT_AMOUNT',
          ),
          1 => 
          array (
            'name' => 'discount_percent_c',
            'label' => 'LBL_DISCOUNT_PERCENT',
          ),
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'tax_amount',
            'label' => 'LBL_TAX_AMOUNT',
          ),
          1 => 
          array (
            'name' => 'total_amount',
            'label' => 'LBL_GRAND_TOTAL',
          ),
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'dsc_payment_c',
            'label' => 'LBL_DSC_PAYMENT',
          ),
          1 => 
          array (
            'name' => 'expiration',
            'label' => 'LBL_EXPIRATION',
          ),
        ),
        5 => 
        array (
          0 => 
          array (
            'name' => 'imp_agent_code_c',
            'studio' => 'visible',
            'label' => 'LBL_IMP_AGENT_CODE',
          ),
          1 => 
          array (
            'name' => 'mekit_agent_code_c',
            'studio' => 'visible',
            'label' => 'LBL_MEKIT_AGENT_CODE',
          ),
        ),
      ),
      'lbl_editview_panel2' => 
      array (
        0 => 
        array (
          0 => 
          array (
            'name' => 'assigned_user_name',
            'label' => 'LBL_ASSIGNED_TO_NAME',
          ),
          1 => 
          array (
            'name' => 'document_year_c',
            'label' => 'LBL_DOCUMENT_YEAR',
          ),
        ),
        1 => 
        array (
          0 => 
          array (
            'name' => 'billing_account',
            'label' => 'LBL_BILLING_ACCOUNT',
            'displayParams' => 
            array (
              'key' => 
              array (
                0 => 'billing',
                1 => 'shipping',
              ),
              'copy' => 
              array (
                0 => 'billing',
                1 => 'shipping',
              ),
              'billingKey' => 'billing',
              'shippingKey' => 'shipping',
            ),
          ),
          1 => 
          array (
            'name' => 'billing_contact',
            'label' => 'LBL_BILLING_CONTACT',
            'displayParams' => 
            array (
              'initial_filter' => '&account_name="+this.form.{$fields.billing_account.name}.value+"',
            ),
          ),
        ),
        2 => 
        array (
          0 => 
          array (
            'name' => 'billing_address_street',
            'hideLabel' => true,
            'type' => 'address',
            'displayParams' => 
            array (
              'key' => 'billing',
              'rows' => 2,
              'cols' => 30,
              'maxlength' => 150,
            ),
            'label' => 'LBL_BILLING_ADDRESS_STREET',
          ),
          1 => 
          array (
            'name' => 'shipping_address_street',
            'hideLabel' => true,
            'type' => 'address',
            'displayParams' => 
            array (
              'key' => 'shipping',
              'copy' => 'billing',
              'rows' => 2,
              'cols' => 30,
              'maxlength' => 150,
            ),
            'label' => 'LBL_SHIPPING_ADDRESS_STREET',
          ),
        ),
        3 => 
        array (
          0 => 
          array (
            'name' => 'metodo_database_c',
            'studio' => 'visible',
            'label' => 'LBL_METODO_DATABASE',
          ),
          1 => 
          array (
            'name' => 'metodo_id_head_c',
            'label' => 'LBL_METODO_ID_HEAD',
          ),
        ),
        4 => 
        array (
          0 => 
          array (
            'name' => 'created_by_name',
            'label' => 'LBL_CREATED',
          ),
          1 => 
          array (
            'name' => 'modified_by_name',
            'label' => 'LBL_MODIFIED_NAME',
          ),
        ),
      ),
    ),
  ),
);
?>
