<?php
// created: 2017-03-21 16:07:32
$viewdefs['Calls']['EditView'] = array (
  'templateMeta' => 
  array (
    'includes' => 
    array (
      0 => 
      array (
        'file' => 'modules/Reminders/Reminders.js',
      ),
    ),
    'maxColumns' => '2',
    'form' => 
    array (
      'hidden' => 
      array (
        0 => '<input type="hidden" name="isSaveAndNew" value="false">',
        1 => '<input type="hidden" name="send_invites">',
        2 => '<input type="hidden" name="user_invitees">',
        3 => '<input type="hidden" name="lead_invitees">',
        4 => '<input type="hidden" name="contact_invitees">',
      ),
      'buttons' => 
      array (
        0 => 
        array (
          'customCode' => '<input title="{$APP.LBL_SAVE_BUTTON_TITLE}" id="SAVE_HEADER" accessKey="{$APP.LBL_SAVE_BUTTON_KEY}" class="button primary" onclick="SUGAR.calls.fill_invitees();document.EditView.action.value=\'Save\'; document.EditView.return_action.value=\'DetailView\'; {if isset($smarty.request.isDuplicate) && $smarty.request.isDuplicate eq "true"}document.EditView.return_id.value=\'\'; {/if}formSubmitCheck();;" type="button" name="button" value="{$APP.LBL_SAVE_BUTTON_LABEL}">',
        ),
        1 => 'CANCEL',
        2 => 
        array (
          'customCode' => '<input title="{$MOD.LBL_SEND_BUTTON_TITLE}" id="SAVE_SEND_HEADER" class="button" onclick="document.EditView.send_invites.value=\'1\';SUGAR.calls.fill_invitees();document.EditView.action.value=\'Save\';document.EditView.return_action.value=\'EditView\';document.EditView.return_module.value=\'{$smarty.request.return_module}\';formSubmitCheck();;" type="button" name="button" value="{$MOD.LBL_SEND_BUTTON_LABEL}">',
        ),
        3 => 
        array (
          'customCode' => '{if $fields.status.value != "Held"}<input title="{$APP.LBL_CLOSE_AND_CREATE_BUTTON_TITLE}" id="CLOSE_CREATE_HEADER" accessKey="{$APP.LBL_CLOSE_AND_CREATE_BUTTON_KEY}" class="button" onclick="SUGAR.calls.fill_invitees(); document.EditView.status.value=\'Held\'; document.EditView.action.value=\'Save\'; document.EditView.return_module.value=\'Calls\'; document.EditView.isDuplicate.value=true; document.EditView.isSaveAndNew.value=true; document.EditView.return_action.value=\'EditView\'; document.EditView.return_id.value=\'{$fields.id.value}\'; formSubmitCheck();" type="button" name="button" value="{$APP.LBL_CLOSE_AND_CREATE_BUTTON_LABEL}">{/if}',
        ),
      ),
      'buttons_footer' => 
      array (
        0 => 
        array (
          'customCode' => '<input title="{$APP.LBL_SAVE_BUTTON_TITLE}" id ="SAVE_FOOTER" accessKey="{$APP.LBL_SAVE_BUTTON_KEY}" class="button primary" onclick="SUGAR.calls.fill_invitees();document.EditView.action.value=\'Save\'; document.EditView.return_action.value=\'DetailView\'; {if isset($smarty.request.isDuplicate) && $smarty.request.isDuplicate eq "true"}document.EditView.return_id.value=\'\'; {/if} formSubmitCheck();"type="button" name="button" value="{$APP.LBL_SAVE_BUTTON_LABEL}">',
        ),
        1 => 'CANCEL',
        2 => 
        array (
          'customCode' => '<input title="{$MOD.LBL_SEND_BUTTON_TITLE}" id="save_and_send_invites_footer" class="button" onclick="document.EditView.send_invites.value=\'1\';SUGAR.calls.fill_invitees();document.EditView.action.value=\'Save\';document.EditView.return_action.value=\'EditView\';document.EditView.return_module.value=\'{$smarty.request.return_module}\'; formSubmitCheck();"type="button" name="button" value="{$MOD.LBL_SEND_BUTTON_LABEL}">',
        ),
        3 => 
        array (
          'customCode' => '{if $fields.status.value != "Held"}<input title="{$APP.LBL_CLOSE_AND_CREATE_BUTTON_TITLE}" id="close_and_create_new_footer" class="button" onclick="SUGAR.calls.fill_invitees(); document.EditView.status.value=\'Held\'; document.EditView.action.value=\'Save\'; document.EditView.return_module.value=\'Meetings\'; document.EditView.isDuplicate.value=true; document.EditView.isSaveAndNew.value=true; document.EditView.return_action.value=\'EditView\'; document.EditView.return_id.value=\'{$fields.id.value}\'; formSubmitCheck();"type="button" name="button" value="{$APP.LBL_CLOSE_AND_CREATE_BUTTON_LABEL}">{/if}',
        ),
      ),
      'headerTpl' => 'modules/Calls/tpls/header.tpl',
      'footerTpl' => 'modules/Calls/tpls/footer.tpl',
    ),
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
    'javascript' => '{sugar_getscript file="cache/include/javascript/sugar_grp_jsolait.js"}
<script type="text/javascript">{$JSON_CONFIG_JAVASCRIPT}</script>
<script>toggle_portal_flag();function toggle_portal_flag()  {ldelim} {$TOGGLE_JS} {rdelim}
function formSubmitCheck(){ldelim}var duration=true;if(typeof(isValidDuration)!="undefined"){ldelim}duration=isValidDuration();{rdelim}if(check_form(\'EditView\') && duration){ldelim}SUGAR.ajaxUI.submitForm("EditView");{rdelim}{rdelim}</script>',
    'useTabs' => false,
    'tabDefs' => 
    array (
      'LBL_CALL_INFORMATION' => 
      array (
        'newTab' => false,
        'panelDefault' => 'expanded',
      ),
    ),
  ),
  'panels' => 
  array (
    'lbl_call_information' => 
    array (
      0 => 
      array (
        0 => 
        array (
          'name' => 'name',
        ),
        1 => 
        array (
          'name' => 'parent_name',
          'label' => 'LBL_LIST_RELATED_TO',
        ),
      ),
      1 => 
      array (
        0 => 
        array (
          'name' => 'date_schedule_c',
          'label' => 'LBL_DATE_SCHEDULE',
          'displayParams' => 
          array (
            'updateCallback' => 'customCallsEditScheduleDateUpdate();',
          ),
        ),
        1 => 
        array (
          'name' => 'date_start',
          'displayParams' => 
          array (
            'updateCallback' => 'SugarWidgetScheduler.update_time();',
          ),
          'label' => 'LBL_DATE_TIME',
        ),
      ),
      2 => 
      array (
        0 => 
        array (
          'name' => 'status',
          'fields' => 
          array (
            0 => 
            array (
              'name' => 'direction',
            ),
            1 => 
            array (
              'name' => 'status',
            ),
          ),
        ),
      ),
      3 => 
      array (
        0 => 
        array (
          'name' => 'description',
          'comment' => 'Full text of the note',
          'label' => 'LBL_DESCRIPTION',
        ),
      ),
      4 => 
      array (
        0 => 
        array (
          'name' => 'duration_hours',
          'label' => 'LBL_DURATION',
          'customCode' => '{literal}<script type="text/javascript">function isValidDuration() { form = document.getElementById(\'EditView\'); if ( form.duration_hours.value + form.duration_minutes.value <= 0 ) { alert(\'{/literal}{$MOD.NOTICE_DURATION_TIME}{literal}\'); return false; } return true; }</script>{/literal}<input id="duration_hours" name="duration_hours" size="2" maxlength="2" type="text" value="{$fields.duration_hours.value}" onkeyup="SugarWidgetScheduler.update_time();"/>{$fields.duration_minutes.value}&nbsp;<span class="dateFormat">{$MOD.LBL_HOURS_MINUTES}</span>',
        ),
        1 => 
        array (
          'name' => 'assigned_user_name',
          'label' => 'LBL_ASSIGNED_TO_NAME',
        ),
      ),
    ),
    'lbl_editview_panel1' => 
    array (
      0 => 
      array (
        0 => 
        array (
          'name' => 'campagna_telefonica_c',
          'studio' => 'visible',
          'label' => 'LBL_CAMPAGNA_TELEFONICA',
        ),
        1 => 
        array (
          'name' => 'relativo_a_campagna_c',
          'studio' => 'visible',
          'label' => 'LBL_RELATIVO_A_CAMPAGNA',
        ),
      ),
      1 => 
      array (
        0 => 
        array (
          'name' => 'office_phone_c',
          'label' => 'LBL_OFFICE_PHONE',
        ),
        1 => 
        array (
          'name' => 'call_period_c',
          'studio' => 'visible',
          'label' => 'LBL_CALL_PERIOD',
        ),
      ),
      2 => 
      array (
        0 => 
        array (
          'name' => 'assigned_client_c',
          'label' => 'LBL_ASSIGNED_CLIENT',
        ),
      ),
      3 => 
      array (
        0 => 
        array (
          'name' => 'billing_address_postalcode_c',
          'label' => 'LBL_BILLING_ADDRESS_POSTALCODE',
        ),
        1 => 
        array (
          'name' => 'billing_address_city_c',
          'label' => 'LBL_BILLING_ADDRESS_CITY',
        ),
      ),
      4 => 
      array (
        0 => 
        array (
          'name' => 'billing_address_street_c',
          'label' => 'LBL_BILLING_ADDRESS_STREET',
        ),
        1 => 
        array (
          'name' => 'location_zone_c',
          'studio' => 'visible',
          'label' => 'LBL_LOCATION_ZONE',
        ),
      ),
      5 => 
      array (
        0 => 
        array (
          'name' => 'company_status_c',
          'studio' => 'visible',
          'label' => 'LBL_COMPANY_STATUS',
        ),
        1 => 
        array (
          'name' => 'profitability_c',
          'studio' => 'visible',
          'label' => 'LBL_PROFITABILITY',
        ),
      ),
      6 => 
      array (
        0 => 
        array (
          'name' => 'target_c',
          'studio' => 'visible',
          'label' => 'LBL_TARGET',
        ),
        1 => 
        array (
          'name' => 'industry_c',
          'studio' => 'visible',
          'label' => 'LBL_INDUSTRY',
        ),
      ),
      7 => 
      array (
        0 => 
        array (
          'name' => 'istatoazienda_c',
          'studio' => 'visible',
          'label' => 'LBL_ISTATOAZIENDA',
        ),
        1 => 
        array (
          'name' => 'ifasestato_c',
          'studio' => 'visible',
          'label' => 'LBL_IFASESTATO',
        ),
      ),
    ),
  ),
);