var mobile_version = "5.7.0", QAppName = "QuickCRM", unlocked = true, init_done = false, home_created = false, LastViewed = [], Favorites = [], SugarSessionId = "", RowsPerPage = 20, RowsPerDashlet = 5, RowsPerSubPanel = 5, IconsLabels = true, tmpIconsLabels = false, CurrentUserId = "", UserIsAdmin = false, CurrentUserName = Quser_name, CurrentProfileId = "", CurrentUserTeams = [], CurrentUserRoles = [], CurrentUserRoleIds = [], CurrentUserReports = [], CurrentRecordValues = {}, CurrentRecordLinks = [], ActivitiesCurrentOffset = 0, ActivitiesNextOffset = 0, ActivitiesPrevOffset = 0, PrevID = false, JJWG = {}, ForceLogin = false, shared_field = "shared", add_prefixes = ["alt", "primary", "billing", "shipping"], HighlightedColor = "fae9c7", ListColorsBool = ["#F5F5F5", "#" + HighlightedColor], ListColors = ["rgb(255, 255, 255)", "rgb(245, 245, 245)", "rgb(255,255,225)", "rgb(225,255,255)", "rgb(255,230,255)", "rgb(255,232,232)", "rgb(232,255,232)", "rgb(232,232,255)", "rgb(245,225,190)", "rgb(245,190,225)", "rgb(225,190,245)", "rgb(225,245,190)", "rgb(190,225,245)", "rgb(190,245,225)", "rgb(255, 211, 155)"], FooterDef = '<div data-role="footer" data-position="fixed" data-tap-toggle="false" data-theme="d">', EmptyFile = {
    name: "",
    contents: "",
    mime_type: ""
}, OptUpload = (!QCRM.OffLine && window.File && window.FileReader && window.FileList && typeof btoa === "function" ? true : false), PagesCreated = false, AttachTo = "", Pref = {}, edit_data = {}, dbgOption = false, dbgval = "", regFindField = new RegExp("^(.*){(.+)}(.*)$", ""), ListsPages = ["Calendar", "GS"], SearchPages = [], ViewPages = [], Qpattern = new RegExp('^(.+session":")("|[^"]+)(".+)$', ""), button_defaults = ' data-role="button" data-mini="true" data-inline="true" class="QCRMLinks"', de_entries = new Array, HiddenFields = ["FromModule", "FromId", "FromName", "FromLnk", "FromAccountId", "PrevPage", "parentJJWG"], Beans = [], SimpleBeans = [], SugarFields = [];
QCRM.ServerVersion = "1.0";
QCRM.Ready = false;
QCRM.AudioNotes = false;
QCRM.WithIcons = true;
QCRM.OffLineSupport = false;
QCRM.minForFilter = 15;
QCRM.GooglePlacesSearch = false;
QCRM.GooglePlacesMode = "Autocomplete";
QCRM.GooglePlacesTypes = [];
QCRM.AddressSearchHere = false;
if (typeof QServer !== "undefined") {
    QCRM.ServerVersion = QServer
}
if (db_type !== "mysql") {
    if (QCRM.ServerVersion >= "4.1.1") {
        shared_field = "shared_rec"
    }
}
if (typeof suitecrm !== "undefined") {
    QCRM.SuiteCRM = suitecrm
} else {
    QCRM.SuiteCRM = false
}
QCRM.mode = "mobile";
try {
    if (navigator.userAgent.match(/ipad/gi) || (((screen.width / window.devicePixelRatio >= 480) && (screen.height / window.devicePixelRatio >= 800)) || ((screen.width / window.devicePixelRatio >= 800) && (screen.height / window.devicePixelRatio >= 480)))) {
        QCRM.mode = "tablet"
    }
} catch (err) {
}
QCRM.calendar = {
    firstDay: 0,
    dates: {},
    init: false,
    currDate: new Date(),
    viewmode: "list",
    weekmode: false,
    curUser: "",
    shared: true,
    modules: [{
        module: "Calls",
        start: "date_start",
        end: (sugar_mod_fields.Calls && sugar_mod_fields.Calls.date_end) ? "date_end" : "date_start",
        hidden: []
    }, {
        module: "Meetings",
        start: "date_start",
        end: (sugar_mod_fields.Meetings && sugar_mod_fields.Meetings.date_end) ? "date_end" : "date_start",
        hidden: []
    }]
};
QCRM.hooks = {init: [], before_sync: [], before_login: [], after_login: []};
QCRM.maxPickRelate = 10;
QCRM.maxDashlets = 8;
QCRM.presetDashlets = [];
QCRM.DrawingSignature = true;
QCRM.customInit = [];
QCRM.ABindex = -1;
QCRM.PickUsers = false;
QCRM.ShowToday = (mobile_edition === "Pro");
QCRM.AssignedMeetingsOnly = false;
QCRM.telLink = (mobile_app) ? "tel:" : "callto:";
QCRM.SavedSearches = {};
QCRM.Dashlets = [];
QCRM.dashletsDiv = [];
QCRM.searchIcons = [];
QCRM.createIcons = [];
QCRM.homepage = {name: "", id: "", user: ""};
QCRM.homepage[shared_field] = "0";
QCRM.saveToCRM = false;
QCRM.UpdButtons = true;
QCRM.UpdFavIcons = true;
QCRM.users_dropdown = true;
QCRM.share_search = "All";
QCRM.native_cal = true;
QCRM.native_cal_list = [];
QCRM.PhoneStyle = 'data-theme="e"';
QCRM.multiple_assigned = true;
QCRM.DefIcons = ["ProspectLists", "Prospects", "SugarFeed", "FP_events", "jjwg_Maps", "jjwg_Markers", "Accounts", "AOS_Contracts", "AOS_Invoices", "AOS_Product_Categories", "AOS_Products", "AOS_Products_Quotes", "AOR_Reports", "asol_Reports", "KReports", "AOS_Quotes", "Bugs", "Calls", "Campaigns", "Cases", "Contacts", "Contracts", "Documents", "Emails", "Employees", "Leads", "Meetings", "Notes", "Opportunities", "Products", "Project", "ProjectTask", "Quotes", "Targets", "Tasks", "Users"];
QCRM.CallAssignedOnly = false;
QCRM.ProfileMode = "ACLRoles";
QCRM.Profiles = {};
QCRM.addressFields = ["street", "city", "state", "postalcode", "country"];
QCRM.google_addressFields = ["street", "city", "state", "postalcode", "country"];
QCRM.addressTemplate = Addresses_Template;
QCRM.phoneModules = ["Calls", "Meetings", "Tasks", "Cases", "Opportunities"];
QCRM.fieldTypes = {
    text: "memo",
    name: "text",
    varchar: "text",
    "char": "text",
    iframe: "text",
    url: "text",
    "enum": "select",
    multienum: "select",
    date: "date",
    datetime: "datetime",
    currency: "number",
    "int": "number",
    "float": "number",
    decimal: "number",
    "double": "number",
    email: "email",
    phone: "phone",
    bool: "bool",
    "boolean": "bool",
    relate: "relate",
    parent: "parent"
};
QCRM.imageFields = {photo: false, image: false};
QCRM.imageResolution = 25;
if (QCRM.ServerVersion >= "4.5.8") {
    QCRM.imageFields.photo = true
}
if (QCRM.ServerVersion >= "4.5.7") {
    QCRM.imageFields.image = true
}
QCRM.ShowCurrentLocation = false;
QCRM.showEmptyFields = false;
QCRM.globalSearchButton = false;
QCRM.forceLock = false;
QCRM.LockSetDrawing = false;
QCRM.History = [];
QCRM.Swipes = {
    edit: {
        percent: -10,
        color: "#598bbe",
        text: sugar_app_strings.LBL_EDIT_BUTTON,
        icon: "fa-pencil",
        action: function(a, b)
        {
            Beans[a.data("module")].Update(a.data("identity"), $("body").pagecontainer("getActivePage").attr("id"))
        },
        disabled: function(b, c)
        {
            var a = !Beans[b.data("module")].acl.edit;
            if (!a && b.data("edit") != undefined) {
                a = b.data("edit") === "0"
            }
            return a
        }
    },
    del: {
        percent: -50,
        color: "red",
        text: sugar_app_strings.LBL_DELETE_BUTTON_LABEL,
        icon: "fa-trash-o",
        action: function(b, c)
        {
            var a = b.data("module"), d = b.data("identity");
            SugarCrmDelete(a, d, false, function()
            {
                c.remove(b)
            });
            if (QCRM.mode === "tablet" && !Beans[a].fullPage && $("#" + a + "DetailsList").data("identity") == d) {
                $("#" + a + "DetailsList").html()
            }
        },
        disabled: function(b, c)
        {
            var a = !Beans[b.data("module")].acl.del;
            if (!a && b.data("del") != undefined) {
                a = b.data("del") === "0"
            }
            return a
        }
    },
    remove: {
        percent: -30,
        color: "crimson",
        text: sugar_app_strings.LNK_REMOVE,
        icon: "material-close",
        action: function(b, c)
        {
            var a = b.data("from");
            ConfirmPopup(sugar_app_strings.NTC_REMOVE_CONFIRMATION || (sugar_app_strings.LNK_REMOVE + "?"), function()
            {
                QCRM.delete_relationship(a, Beans[a].CurrentId, b.data("relationship"), b.data("identity"), false);
                c.remove(b)
            })
        },
        disabled: function(b, c)
        {
            var a = !Beans[b.data("module")].acl.del;
            if (!a && b.data("del") != undefined) {
                a = b.data("del") === "0"
            }
            return a
        }
    },
    previous: {
        percent: 5, color: "#598bbe", icon: "ion-android-remove", action: function(a, b)
        {
            QCRM.TodayDashlet.update(-1)
        }
    },
    next: {
        percent: -5, color: "#598bbe", icon: "ion-android-add", action: function(a, b)
        {
            QCRM.TodayDashlet.update(1)
        }
    }
};
QCRM.Menus = {
    edit: {
        text: sugar_app_strings.LBL_EDIT_BUTTON, action: function(a)
        {
            Beans[a.module].Update(a.identity, a.module + "ListPage")
        }, disabled: function(a)
        {
            return !Beans[a.module].acl.edit
        }
    }, del: {
        text: sugar_app_strings.LBL_DELETE_BUTTON_LABEL, action: function(a)
        {
            SugarCrmDelete(a.module, a.identity)
        }, disabled: function(a)
        {
            return !Beans[a.module].acl.del
        }
    }
};
QCRM.defaultSwipe = [QCRM.Swipes.edit, QCRM.Swipes.del];
QCRM.defaultRelSwipe = [QCRM.Swipes.edit, QCRM.Swipes.remove, QCRM.Swipes.del];
QCRM.moduleMenu = {all: QCRM.Menus, nomenu: {}};
QCRM.moduleSwipe = {
    all: {stages: QCRM.defaultSwipe},
    today: {stages: [QCRM.Swipes.previous, QCRM.Swipes.next]},
    noswipe: {disabled: true, swipe: false, stages: []}
};
QCRM.relationshipSwipe = {
    all: {stages: QCRM.defaultRelSwipe},
    edit: {stages: [QCRM.Swipes.edit]},
    remove: {stages: [QCRM.Swipes.remove]},
    "delete": {stages: [QCRM.Swipes.del]},
    noswipe: {disabled: true, swipe: false}
};
QCRM.inlineStyle = "padding-top:2px;padding-bottom:3px";
QCRM.InAppExtensions = (iOS ? /.+(wav|mp3|gif|png|jpg|jpeg|pdf)$/i : /.+(wav|mp3|gif|png|jpg|jpeg)$/i);
QCRM.AudioExtensions = /.+(wav|mp3)$/i;
QCRM.ExtWhiteList = /.+(wav|mp3|gif|png|jpg|jpeg|mp4|mpg|pdf|doc|docx|xls|xlsx|ppt|ppdx|odt|rtf|txt)$/i;
QCRM.IEsavedContents = "";
QCRM.DrawingWidth = (QCRM.mode === "tablet") ? 600 : 300;
QCRM.ActionsMenu = (QCRM.mode !== "tablet");
QCRM.ScrollLists = mobile_app;
QCRM.MaxGlobalSearch = 5;
QCRM.UserHasRole = function(b)
{
    if (CurrentUserRoles == "") {
        return false
    }
    if ((QCRM.sugaroutfitters || QCRM.usersTable)) {
        return CurrentUserRoles.indexOf(b) > -1
    } else {
        for (var a in CurrentUserRoles) {
            if (CurrentUserRoles[a].name == b) {
                return true
            }
        }
        return false
    }
};
QCRM.UserHasTeam = function(b)
{
    if (!(QCRM.sugaroutfitters || QCRM.usersTable)) {
        return false
    } else {
        for (var a in CurrentUserTeams) {
            if (CurrentUserTeams[a].name == b) {
                return true
            }
        }
        return false
    }
};
QCRM.UserIsAdmin = function()
{
    return UserIsAdmin
};
QCRM.SetAppHook = function(b, a)
{
    if (QCRM.hooks[b]) {
        QCRM.hooks[b].push(a)
    }
};
QCRM.SetModuleHook = function(a, c, b)
{
    if (Beans[a] && Beans[a].hooks[c]) {
        Beans[a].hooks[c].push(b)
    }
};
QCRM.SetFieldHook = function(a, d, c, b)
{
    if (sugar_mod_fields[a] && sugar_mod_fields[a][d]) {
        if (c == "noedit" && b) {
            if (Beans[a]) {
                Beans[a].EditExcluded.push(d)
            }
        } else {
            sugar_mod_fields[a][d][c] = b
        }
    }
};
QCRM.GetFieldHook = function(a, c, b)
{
    if (sugar_mod_fields[a] && sugar_mod_fields[a][c] && sugar_mod_fields[a][c][b]) {
        return sugar_mod_fields[a][c][b]
    } else {
        return false
    }
};
QCRM.ExistsFieldHook = function(a, c, b)
{
    return (sugar_mod_fields[a] && sugar_mod_fields[a][c] && (typeof sugar_mod_fields[a][c][b] !== "undefined"))
};
QCRM.CustomInstall = function()
{
};
QCRM.SetFieldValue = function(b, e, c)
{
    if (sugar_mod_fields[b] && sugar_mod_fields[b][e]) {
        var d = sugar_mod_fields[b][e], a = "#Edit" + b + "_" + e;
        switch (d.type) {
            case"enum":
                set_enum_val(a, c);
                break;
            case"date":
            case"datetime":
                $(a).mobiscroll("setDate", c, true);
                break;
            case"bool":
            case"boolean":
                set_bool_val(a, e, c);
                break;
            default:
                $(a).val(c)
        }
    }
};
QCRM.GetFieldValue = function(b, d)
{
    if (sugar_mod_fields[b] && sugar_mod_fields[b][d]) {
        var c = sugar_mod_fields[b][d], a = "#Edit" + b + "_" + d, e;
        switch (c.type) {
            case"date":
            case"datetime":
                return $(a).mobiscroll("getDate");
                break;
            case"bool":
            case"boolean":
                e = $(ctrl + "div input:radio:checked").val();
                if (e == undefined || e == "0") {
                    return false
                }
                return true;
                break;
            default:
                return $(a).val()
        }
    }
};
QCRM.GetDetailFieldId = function(a, b)
{
    return "#" + a + b + "V"
};
QCRM.DetailFieldShow = function(a, b)
{
    $("#" + a + b + "V").show()
};
QCRM.DetailFieldHide = function(a, b)
{
    $("#" + a + b + "V").hide()
};
QCRM.GetEditFieldId = function(a, b)
{
    return "#Edit" + a + "_" + b
};
QCRM.SetFieldReadonly = function(b, e, a)
{
    var g = "#Edit" + b + "_" + e, d = sugar_mod_fields[b][e], c = a ? "disable" : "enable";
    switch (d.type) {
        case"enum":
        case"radioenum":
        case"dynamicenum":
        case"multienum":
            $(g).attr("disabled", a);
            break;
        case"bool":
        case"boolean":
            $(g + "0").checkboxradio(c);
            $(g + "1").checkboxradio(c);
            break;
        case"date":
        case"datetime":
            $(g).mobiscroll(c);
        default:
            $(g).attr("readonly", a)
    }
};
QCRM.EditFieldShow = function(b, d)
{
    var c = sugar_mod_fields[b][d], a = d + (c.type == "bool" ? "0" : "");
    $("#Edit" + b + "_" + a).closest(".ui-field-contain").show()
};
QCRM.EditFieldHide = function(b, d)
{
    var c = sugar_mod_fields[b][d], a = d + (c.type == "bool" ? "0" : "");
    $("#Edit" + b + "_" + a).closest(".ui-field-contain").hide()
};
QCRM.SetRelationshipHook = function(b, a, d, c)
{
    if (Beans[b] && Beans[b].Links && Beans[b].Links[a]) {
        Beans[b].Links[a][d] = c
    }
};
if (typeof QCRM.ajaxHeader === "undefined") {
    QCRM.ajaxHeader = function(a)
    {
    }
}
QCRM.CustomRest = function(g, d, l, h, c, a, b)
{
    var e = {
        url: ServerAddress + g,
        dataType: l,
        async: true,
        data: h,
        type: d,
        crossdomain: mobile_app,
        cache: false,
        error: function(n, o, m)
        {
            if (!b) {
                QCRM.CustomRest(g, d, l, h, c, a, true)
            } else {
                if (a === null) {
                    c(null)
                } else {
                    a(null)
                }
            }
        },
        success: c
    };
    e.timeout = 420000;
    if (QCRM.QBasicAuth) {
        e.beforeSend = QCRM.ajaxHeader;
        e.dataType = "jsonp";
        e.jsonp = "jsoncallback"
    }
    $.ajax(e)
};
function QAjax(g, d, c, a, b)
{
    var e = {
        url: proxy_url,
        dataType: "json",
        data: {method: g, input_type: "JSON", response_type: "JSON", rest_data: d},
        type: "post",
        crossdomain: mobile_app,
        cache: false,
        error: function(l, m, h)
        {
            if (!b && (g != "set_entry")) {
                QAjax(g, d, c, a, true)
            } else {
                if (!a) {
                    c(null)
                } else {
                    a(null)
                }
            }
        },
        success: c
    };
    e.timeout = 360000;
    if (QCRM.QBasicAuth) {
        e.beforeSend = QCRM.ajaxHeader;
        e.dataType = "jsonp";
        e.jsonp = "jsoncallback"
    }
    $.ajax(e)
}
function SugarQuery(g, c, e, a, d)
{
    function b(l)
    {
        var n, m = "", o = "", p, h;
        if (l !== null && l.name === "Invalid Session ID" && g !== "logout") {
            if (g !== "login") {
                if (d === undefined) {
                    d = 1
                } else {
                    d++
                }
                if (d > 6) {
                    return
                }
                SugarQuery("login", '[{"encryption":"PLAIN","password":"' + Qpwd + '","user_name":"' + Quser_name + '"},"",""]', function(q)
                {
                    c = c.replace(Qpattern, "$1") + SugarSessionId + c.replace(Qpattern, "$3");
                    SugarQuery(g, c, e, a, d + 1)
                }, a, d)
            } else {
                e(l)
            }
        } else {
            if (l !== null && g == "login" && l.name_value_list !== undefined) {
                SugarSessionId = l.id;
                CurrentUserId = l.name_value_list.user_id.value;
                UserIsAdmin = l.name_value_list.user_is_admin && l.name_value_list.user_is_admin.value !== false;
                if (mobile_edition === "Pro" || ForceCE) {
                    if ((QCRM.sugaroutfitters && sugar_version >= "6.3") || QCRM.usersTable) {
                        n = l.name_value_list.fulluser !== true;
                        if (!n) {
                            if (l.name_value_list.roles.length > 0) {
                                CurrentUserRoles = l.name_value_list.roles;
                                m = JSON.stringify(l.name_value_list.roles)
                            }
                            localStorage.setItem(ServerAddress + "R" + CurrentUserId, m);
                            if (l.name_value_list.role_ids && l.name_value_list.role_ids.length > 0) {
                                CurrentUserRoleIds = l.name_value_list.role_ids;
                                o = JSON.stringify(l.name_value_list.role_ids);
                                if (QCRM.ProfileMode != "SecurityGroups") {
                                    CurrentProfileId = l.name_value_list.role_ids[0];
                                    localStorage.setItem(ServerAddress + "SugarTeamId", CurrentProfileId);
                                    QCRM.setProfile()
                                }
                            }
                            localStorage.setItem(ServerAddress + "RI" + CurrentUserId, o);
                            if (l.name_value_list.teams) {
                                CurrentUserTeams = l.name_value_list.teams;
                                localStorage.setItem(ServerAddress + "T" + CurrentUserId, JSON.stringify(CurrentUserTeams));
                                if (QCRM.ProfileMode == "SecurityGroups") {
                                    for (h in l.name_value_list.teams) {
                                        CurrentProfileId = l.name_value_list.teams[h].id;
                                        localStorage.setItem(ServerAddress + "SugarTeamId", CurrentProfileId);
                                        QCRM.setProfile();
                                        break
                                    }
                                }
                            }
                        }
                    } else {
                        if (qusers === undefined) {
                            n = true
                        } else {
                            n = ((qusers > 0) && (mobile_usr.indexOf(CurrentUserId) == -1))
                        }
                    }
                    if (n) {
                        $.mobile.loading("hide");
                        if (mobile_app) {
                        } else {
                            mobile_edition = "CE";
                            AlertPopup(RES_ACCESS_DENIED_MSG);
                            LogOutUser();
                            return
                        }
                    } else {
                        if (ForceCE) {
                            if ("ce-" + ServerAddress in localStorage) {
                                localStorage.removeItem("ce-" + ServerAddress)
                            }
                            AppReload()
                        }
                    }
                }
            }
            e(l)
        }
    }

    QAjax(g, c, b, a)
}
function Array_unique(a)
{
    return a.filter(function(d, c, b)
    {
        return b.indexOf(d) === c
    })
}
QCRM.get_available_modules = function(h)
{
    var d = localStorage.getItem("dis-" + ServerAddress + CurrentUserId), g = localStorage.getItem("acls-" + ServerAddress + CurrentUserId);

    function e(l)
    {
        if (Beans[l] !== undefined) {
            Beans[l].access = "none"
        }
    }

    function c(l, m)
    {
        if (Beans[l] !== undefined) {
            if (m && (m.exp === undefined)) {
                m.exp = true
            }
            Beans[l].acl = m
        }
    }

    function b(p, r)
    {
        var o, m = r.length, n = Beans[p].acl;
        for (o = 0; o < m; o++) {
            var s = r[o], q = s.action;
            switch (q) {
                case"edit":
                    n[q] = n[q] && s.access;
                    break;
                case"export":
                    n.exp = n.exp && s.access;
                    break;
                case"list":
                case"view":
                    n[q] = s.access;
                    break;
                case"delete":
                    n.del = n.del && s.access;
                    break;
                default:
                    break
            }
        }
        return n
    }

    if (d === null || d === "" || g === null || g === "") {
        d = [];
        g = [];
        if (QCRM.OffLine) {
        } else {
            SugarQuery("get_available_modules", '{"session":"' + SugarSessionId + '"' + (sugar_version >= "6.3" ? (',"filter":' + (sugar_version >= "6.5" ? '"all"' : '"all"')) : "") + "}", function(q)
            {
                if (q && q.modules) {
                    q = q.modules;
                    var l, u, s = q.length, n = [], o = (QCRM.beans === undefined ? ["Contacts"] : QCRM.beans);
                    for (l in o) {
                        var r = o[l], v = false;
                        if (typeof q[0] === "string") {
                            if (q.indexOf(r) === -1) {
                                n.push(r);
                                e(r)
                            } else {
                                p = {edit: true, view: true, list: true, exp: true, del: true};
                                g.push({module: r, acls: p});
                                c(r, p);
                                break
                            }
                        } else {
                            for (u = 0; u < s; u++) {
                                var p;
                                if (q[u].module_key === r) {
                                    v = true;
                                    p = b(r, q[u].acls);
                                    g.push({module: r, acls: p});
                                    c(r, p);
                                    break
                                }
                            }
                            if (!v && !UserIsAdmin) {
                                n.push(r);
                                e(r)
                            }
                        }
                    }
                    localStorage.setItem("dis-" + ServerAddress + CurrentUserId, JSON.stringify(n));
                    localStorage.setItem("acls-" + ServerAddress + CurrentUserId, JSON.stringify(g))
                }
                h()
            }, null)
        }
    } else {
        var a;
        d = jQuery.parseJSON(d);
        for (a in d) {
            e(d[a])
        }
        g = jQuery.parseJSON(g);
        for (a in g) {
            c(g[a].module, g[a].acls)
        }
        h()
    }
};
QCRM.set_note_attachment = function(d, a, b, c, g, e, h)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("set_note_attachment", '{"session":"' + SugarSessionId + '","note":{"id":"' + c + '","file":"' + d + '","filename":"' + b + '","related_module_name":"' + g + '","related_module_id":"' + e + '"}}', function(l)
        {
            h(l)
        })
    }
};
QCRM.set_image = function(g, l, a, c, b, h, d, e, o)
{
    if (QCRM.OffLine) {
    } else {
        var m = "set_" + d, n = {
            session: SugarSessionId,
            module_name: c,
            id: b,
            field: h,
            drawing: e ? "" : g,
            deleted: e,
            name: a
        };
        SugarQuery(m, JSON.stringify(n), function(p)
        {
        }, null)
    }
};
QCRM.get_image = function(d, l, g, c, a, h)
{
    var e = "get_" + c, b = {entry_list: {}};
    if (QCRM.OffLine) {
        QCRM.webdb.read_attachment(d, l, g, c, a, function(m, n, o)
        {
            b.entry_list.hasDrawing = true;
            b.entry_list.is_url = true;
            b.entry_list.contents = m;
            h(b)
        }, function()
        {
            b.entry_list.hasDrawing = false;
            h(b)
        })
    } else {
        SugarQuery(e, '{"session":"' + SugarSessionId + '","module_name":"' + d + '","id":"' + l + '","field":"' + g + '","name":"' + name + '"}', h)
    }
};
QCRM.get_entry = function(a, c, b)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("get_entry", '{"session":"' + SugarSessionId + '","module_name":"' + a + '","id":"' + c + '","select_fields":"","link_name_to_fields_array":""}', b)
    }
};
QCRM.get_entry_list = function(a, d, e, m, c, b, h, l)
{
    if (QCRM.OffLine) {
    } else {
        var g = Beans[a].LimitWhere;
        if (g != "") {
            d = g.replace(/@table/g, Beans[a].table) + ((d === "") ? "" : (" AND (" + d + ")"))
        }
        SugarQuery("get_entry_list", '{"session":"' + SugarSessionId + '","module_name":"' + a + '","query":"' + d + '","order_by":"' + h + '","offset":' + c + ',"select_fields":' + e + ',"link_name_to_fields_array":' + (m === "" ? '""' : m) + ',"max_results":' + b + ',"deleted":0}', function(q)
        {
            if (q && q.entry_list) {
                var o, n = q.entry_list.length;
                for (o = 0; o < n; o++) {
                    var p = q.entry_list[o];
                    p.name_value_list.id = {name: "id", value: p.id}
                }
            }
            l(q)
        }, null)
    }
};
QCRM.get_S_entry_list = function(e, d, a, c, h, b, g, l)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("get_entry_list", '{"session":"' + SugarSessionId + '","module_name":"' + e + '","query":"' + d + '","order_by":"' + g + '","offset":' + h + ',"select_fields":["' + a.join('","') + '"],"link_name_to_fields_array":' + (c === "" ? '""' : c) + ',"max_results":' + b + ',"deleted":0}', l, null)
    }
};
QCRM.get_relationships = function(c, a, b, n, h, m, r, o, g, d, q)
{
    if (QCRM.OffLine) {
        QCRM.webdb.get_relationships(c, a, b, n, h, jQuery.parseJSON(m), o, g, d, q)
    } else {
        var e = "", p = "asc", l;
        if (o !== "" && QCRM.ServerVersion < "4.6") {
            l = o.split(" ");
            e = l[0];
            if (l[1] === "desc") {
                p = "desc"
            }
        } else {
            e = o
        }
        SugarQuery("get_relationships", '{"session":"' + SugarSessionId + '","module_name":"' + c + '","module_id":"' + b + '","link_field_name":"' + n + '","related_module_query":"' + h + '","related_fields":' + m + ',"related_module_link_name_to_fields_array":' + (r === "" ? '""' : r) + ',"deleted":0,"order_by":"' + e + '","offset":"' + g + '","limit":"' + (d ? d : "") + '"}', function(s)
        {
            if (s && s.entry_list && p === "desc") {
                s.entry_list.reverse()
            }
            q(s)
        }, null)
    }
};
QCRM.set_entry = function(a, d, b, c)
{
    if (a === "Calls" || a === "Meetings") {
        QCRM.calendar.init = false
    }
    if (d === "") {
        if (b.assigned_user_id === undefined || b.assigned_user_id.value === "") {
            b.assigned_user_id = {name: "assigned_user_id", value: CurrentUserId}
        }
    } else {
        if (b.id === undefined || b.id.value !== d) {
            b.id = {name: "id", value: d}
        }
    }
    if (QCRM.OffLine) {
    } else {
        SugarQuery("set_entry", JSON.stringify({
            session: SugarSessionId,
            module_name: a,
            name_value_list: b
        }, null, 2), c, null)
    }
};
QCRM.delete_entry = function(a, c, b)
{
    if (a === "Calls" || a === "Meetings") {
        QCRM.calendar.init = false
    }
    if (QCRM.OffLine) {
    } else {
        SugarQuery("set_entry", '{"session":"' + SugarSessionId + '","module_name":"' + a + '","name_value_list":[{"name":"id","value":"' + c + '"},{"name":"deleted","value":"1"}]}', b, null)
    }
};
QCRM.set_relationship = function(d, b, a, c)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("set_relationship", '{"session":"' + SugarSessionId + '","module_name":"' + d + '","module_id":"' + b + '","link_field_name":"' + a + '","related_ids":"' + c + '","name_value_list":"","deleted":0}', function(e)
        {
        }, null)
    }
};
QCRM.delete_relationship = function(d, b, a, c, e)
{
    if (QCRM.OffLine) {
    } else {
        if (!e) {
            SugarQuery("set_relationship", '{"session":"' + SugarSessionId + '","module_name":"' + d + '","module_id":"' + b + '","link_field_name":"' + a + '","related_ids":["' + c + '"],"name_value_list":"","deleted":1}', function(g)
            {
            }, null)
        }
    }
};
QCRM.search_by_module = function(b, e, c, a, d)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("search_by_module", '{"session":"' + SugarSessionId + '","search_string":"' + e + '","modules":["' + b.join('","') + '"],"offset":' + c + ',"max_results":' + a + "}", d, null)
    }
};
QCRM.AddToListFields = function(d, a)
{
    var c, e, b = Beans[d];
    if (!b) {
        return
    }
    if (typeof a === "string") {
        a = [a]
    }
    for (c in a) {
        e = a[c];
        if (b.ListFields.indexOf(e) === -1) {
            b.ListFields.push(e)
        }
    }
};
QCRM.AddToSelectFields = function(b, a)
{
    QCRM.AddToListFields(b, a)
};
function sugarLabel(b, a)
{
    if (!sugar_mod_strings[b]) {
        return ""
    }
    return sugar_mod_strings[b][a] || a
}
function matchStringOp(d, b)
{
    var a, c = b.trim().replace('"', '\\"');
    switch (d) {
        case"partial":
            a = "%" + c + "%";
            break;
        case"exact":
            a = c;
            break;
        case"start":
            a = c + "%";
            break;
        default:
            a = (Pref.PartialSearch ? "%" : "") + c + "%";
            break
    }
    return "LIKE '" + a + "'"
}
function matchString(d, c, b)
{
    var a = "";
    if (b !== "") {
        a = "(" + c + " " + matchStringOp(d, b.replace(/'/g, QCRM.OffLine ? "&#039;" : "''")) + ")"
    }
    return a
}
function matchName(a, e, c)
{
    var b = "", d = c.replace(/'/g, QCRM.OffLine ? "&#039;" : "''");
    if (c !== "") {
        if (a.SearchArray) {
            return a.SearchArray.replace(/@@/g, matchStringOp(e, d))
        } else {
            return matchString(e, a.SearchName, d)
        }
    }
    return b
}
function enableButton(b, a)
{
    if (a) {
        $("#" + b).removeClass("ui-disabled")
    } else {
        $("#" + b).addClass("ui-disabled")
    }
}
function CreateExtLink(b, c)
{
    var a = $("<a/>", {href: "#", style: "text-decoration:none;color:#444;" + QCRM.inlineStyle + c});
    a.click({url: b}, function(d)
    {
        d.preventDefault();
        window.open(HTMLDecode(d.data.url).replace(/"/g, "%22"), "_system")
    });
    return a
}
function OpenDownloadLink(d, l, c, b)
{
    var e = (d === "Notes") ? "get_note_attachment" : "get_document_revision", h = c.extension, a = c.filename, g = c.mime_type;
    $.mobile.loading("show");
    if (QCRM.OffLine && Pref.SyncModules[d].attachments) {
    }
    SugarQuery(e, '{"session":"' + SugarSessionId + '","id":"' + c.sugar_id + '"}', function(m)
    {
        $.mobile.loading("hide");
        if (!m) {
            return
        }
        var o = (d === "Notes") ? m.note_attachment.file : m.document_revision.file, n = (h === "pdf") ? "embedPDF" : "embedIMG";
        if (mobile_app && c.inApp && !b) {
        } else {
            if (mobile_app) {
            } else {
                $("#DownloadDiv").html('<embed  class="' + n + '" type="' + g + '" src="data:' + g + ";base64," + escape(o) + '"></embed>');
                $("#DownloadPageTitle").html(data.name.value)
            }
        }
    }, null)
}
function getFileInfo(b, h, e)
{
    var g = (b === "Documents") ? (e.last_rev_mime_type ? e.last_rev_mime_type.value : "") : (e.file_mime_type ? e.file_mime_type.value : ""), a = (e.filename ? e.filename.value : ""), d = /(?:\.([^.]+))?$/, c = g.match(QCRM.InAppExtensions);
    if (g == "") {
        return
    }
    if (c) {
        extension = g.replace(QCRM.InAppExtensions, "$1")
    } else {
        c = a.match(QCRM.InAppExtensions);
        if (c) {
            extension = a.replace(QCRM.InAppExtensions, "$1")
        } else {
            extension = d.exec(a)[1]
        }
    }
    extension = extension.toLowerCase();
    if (extension === "pdf") {
        g = "application/pdf"
    } else {
        if (c) {
            if (a.match(QCRM.AudioExtensions)) {
                g = "audio/" + extension
            } else {
                g = "image/" + extension
            }
        }
    }
    g = g.replace("jpg", "jpeg");
    return {
        inApp: c ? true : false,
        filename: a,
        extension: extension,
        mime_type: g,
        sugar_id: (b === "Documents" ? e.document_revision_id.value : h)
    }
}
function CreateDownloadLink(d, h, g, e, c)
{
    var b = getFileInfo(d, h, g), a;
    if (!b) {
        return ""
    }
    if (mobile_app || b.inApp) {
        a = $("<a/>", {
            href: "#" + ((mobile_app) ? "" : "DownloadPage"),
            "data-theme": "c",
            "data-link": "attach",
            "data-module": d,
            "data-fileinfo": encodeObject(b),
            "data-identity": h,
            "data-external": c ? "true" : "false",
            style: "text-decoration:none;color:#444;" + e
        })
    } else {
        a = CreateExtLink(ServerAddress + "index.php?entryPoint=download&id=" + h + "&type=" + d, e)
    }
    return a
}
function AddPhonePopup(c)
{
    var b = $('<ul id="Phone' + c + 'L" data-role="listview" data-inset="true" data-theme="d"/>'), a = $('<div data-role="popup" data-history="false" data-corner="true" data-shadow="true" data-theme="a" id="Phone' + c + '"/>');
    a.append(b);
    $("#" + c).append(a)
}
function enableMenuAction(c, a)
{
    var b = $("#" + $("body").pagecontainer("getActivePage").attr("id") + ' [data-link="' + c + '"]');
    if (QCRM.ActionsMenu) {
        b = b.parent()
    }
    if (a) {
        b.show()
    } else {
        b.hide()
    }
}
function AddMenuPopup(a, e)
{
    var w, z, u, c = Beans[a], s = $('<ul id="Menu' + a + 'L" data-role="listview" data-inset="true"/>'), n = !QCRM.ActionsMenu || (!c.acl.edit && !c.acl.del), r = $('<div data-role="popup" data-history="false" data-corner="false" data-shadow="true" id="PopupMenu' + a + '"/>'), g = QCRM.ActionsMenu ? "" : button_defaults, b = '<a data-link="editcurrent" ' + g + ">" + sugar_app_strings.LBL_EDIT_BUTTON + "</a>", A = '<a data-rel="back" data-link="delcurrent" ' + g + ">" + sugar_app_strings.LBL_DELETE_BUTTON_LABEL + "</a>", o = '<a data-link="dupcurrent" ' + g + ">" + sugar_app_strings.LBL_DUPLICATE_BUTTON + "</a>", d = $("#" + a + "DetailsBtn"), p = c.access == "edit";

    function q(l)
    {
        if (QCRM.ActionsMenu) {
            s.append($('<li data-icon="false"/>').append(l))
        } else {
            d.append(l)
        }
    }

    if (p && c.acl.edit) {
        q(b)
    }
    if (p && c.acl.del) {
        q(A)
    }
    if (p && mobile_edition == "Pro" && c.acl.edit && c.DuplicateButton) {
        q(o)
    }
    var v = '<a href="#" data-link="createcurrent" ' + g + '><span class="md-icon mbsc-ic mbsc-ic-ion-android-add">&nbsp;' + sugar_app_strings.LBL_CREATE_BUTTON_LABEL + "</span></a>";
    if (QCRM.mode !== "tablet" && mobile_edition == "Pro" && c.acl.edit && c.DuplicateButton) {
        q(v)
    }
    for (u in c.hooks.actions) {
        var w = c.hooks.actions[u], h = w.label, z;
        if (w.icon) {
            h = '<span class="md-icon mbsc-ic ' + w.icon + '">&nbsp;' + h + "</span>"
        }
        z = $('<a id="' + w.id + '" ' + (w.link ? ('data-link="' + w.link + '" ') : "") + g + ">" + h + "</a>");
        if (!w.link) {
            z.click({action: w.action, module: a}, function(l)
            {
                l.preventDefault();
                l.data.action(Beans[l.data.module].CurrentId, l.data.module);
                return false
            })
        }
        q(z);
        if (QCRM.ActionsMenu) {
            n = false
        }
    }
    if (n) {
        $("#" + a + "ActMenu").hide()
    } else {
        r.append(s);
        $("#" + a + e).append(r)
    }
}
function AddMapPopup(d)
{
    var c = $('<div id="Map' + d + 'D"/>'), b = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>', a = $('<div data-role="popup" data-corner="true" data-shadow="true" data-theme="d" id="Map' + d + '"/>');
    a.append(b);
    a.append(c);
    $("#" + d + (Beans[d].fullPage ? "DP" : "ListPage")).append(a)
}
function QuickCRMAddDetailsPage(b)
{
    if (ViewPages.indexOf(b) !== -1) {
        return
    }
    ViewPages = ViewPages.concat(b);
    var c = b + "DP", a = "#Edit" + b;
    $("#" + c).on("pagebeforecreate", function()
    {
        var h, e = Beans[b];
        AddPhonePopup(c);
        AddMenuPopup(b, "DP");
        if (e.HasAddress()) {
            AddMapPopup(b)
        }
        var g = e.CustomLinks || e.Links;
        for (var m in g) {
            var d = (e.CustomLinks && e.CustomLinks[0] !== undefined) ? g[m] : m;
            if (e.Links[d] !== undefined) {
                var l = e.Links[d].module;
                if (sugar_app_list_strings.moduleList[l] !== undefined && (Beans[l] === undefined || (Beans[l].Enabled()))) {
                    $("#" + b + "Links").append('<ul id="' + c + d + 'Ul"  data-role="listview" data-theme="c" data-split-theme="b" data-inset="true" />')
                }
            }
        }
        if (!e.ShowTab) {
            $("#" + b + "SearchBtn").hide()
        }
        if (!e.acl.edit) {
            enableButton(b + "EditBtn", false)
        }
        if (!e.acl.del) {
            enableButton(b + "DelBtn", false)
        }
        for (h in e.hooks.init_view) {
            e.hooks.init_view[h]()
        }
    });
    $("#" + c).on("pageshow", function()
    {
        QCRM.History.push("#" + c);
        Beans[b].ViewDetails()
    });
    $(a).on("pagebeforecreate", function()
    {
        $(a + "Title").text(sugar_app_list_strings.moduleListSingular[b]);
        var e, d = Beans[b];
        if (d.Predefined.indexOf("Edit") !== -1) {
            $(a + "CancelTopBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
            $(a + "ConfirmTopBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL);
            $(a + "CancelBottomBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
            $(a + "ConfirmBottomBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL)
        }
        if (d.access === "edit") {
            d.InitEditForm();
            for (e in d.hooks.init_edit) {
                try {
                    d.hooks.init_edit[e]()
                } catch (g) {
                    AlertPopup("Error found in " + b + " init_edit:/n" + g)
                }
            }
        }
    })
}
function QuickCRMAddListPage(c)
{
    if (SearchPages.indexOf(c) !== -1) {
        return
    }
    SearchPages = SearchPages.concat(c);
    ListsPages = ListsPages.concat(c);
    var a = Beans[c], b;
    a.AddBtn = true;
    $("#" + c + "ListPage").on("pagebeforecreate", function()
    {
        AddPhonePopup(c + "ListPage");
        var e = a.CustomLinks || a.Links;
        if (QCRM.mode === "tablet" && !a.fullPage) {
            AddMenuPopup(c, "ListPage");
            for (var h in e) {
                var d = (a.CustomLinks && a.CustomLinks[0] !== undefined) ? e[h] : h;
                if (a.Links[d] !== undefined) {
                    var g = a.Links[d].module;
                    if (sugar_app_list_strings.moduleList[g] !== undefined && (Beans[g] === undefined || (Beans[g].Enabled()))) {
                        $("#" + c + "Links").append('<ul id="' + c + "DP" + d + 'Ul"  data-role="listview" data-theme="c" data-divider-theme="b" data-split-theme="b" data-inset="true" />')
                    }
                }
            }
            for (b in a.hooks.init_view) {
                a.hooks.init_view[b]()
            }
        }
        $("#SForm" + c).submit(function(l)
        {
            l.preventDefault();
            $("input").blur();
            $("#" + c + "Panel").panel("close");
            setTimeout(function()
            {
                StartSearch(c)
            }, (QCRM.platform == "android") ? 150 : 10)
        });
        if (a.basic_search && a.basic_search.length > 0) {
            $("#" + c + "basic_search").empty();
            init_search_fields(c, a.basic_search, "basic_search")
        }
        if (mobile_edition == "Pro") {
            init_search_form(c, a.SearchFields);
            for (b in a.hooks.init_list) {
                a.hooks.init_list[b]()
            }
            for (b in a.hooks.init_search) {
                a.hooks.init_search[b]()
            }
        } else {
            $("#" + c + "DivMoreOptions").append("<p>" + RES_UNAVAILABLE + "</p>")
        }
    });
    $("#" + c + "ListPage").on("pageshow", function()
    {
        var e = "#" + c + "ListPage";
        if (QCRM.mode === "tablet" && !a.fullPage) {
            a.ViewDetails()
        }
        QCRM.History.push(e);
        LoadMyItems(c);
        a.GetList(a.CurrentOffset);
        if (mobile_edition == "Pro") {
            var d = $("#" + c + "SI").val();
            if (d === "0") {
                SavedSearchEnum(c, "");
                SavedSearchToggle(c);
                $("#" + c + "SI").val("1")
            }
        }
    })
}
function toDBConcatName(b, a)
{
    if (QCRM.OffLine) {
        return "(IFNULL(" + b + ",'') || ' ' || " + a + ")"
    } else {
        if (db_type === "mysql") {
            return "CONCAT(IFNULL(" + b + ",''),' '," + a + ")"
        } else {
            return "ISNULL(" + b + ",'')+' '+" + a
        }
    }
}
function cleanup_phone(a)
{
    return a.replace("(", "").replace(")", "").replace(/\s/g, "").replace(/-/g, "").replace(/\./g, "")
}
function create_input_form(n, c, o, m, l, e, g)
{
    var h = $("<div class='ui-field-contain'" + (l ? ' data-mini="true"' : "") + "/>"), b = m ? "<em>* </em>" : "", d = "<label for='" + c + "'>" + b + o + "</label>", a = $("<input data-theme='d' id='" + c + "' type='" + n + "'" + (g ? " autocomplete='off' autocorrect='off' spellcheck='false' " : "") + (e ? " data-clear-btn='true'" : "") + ">");
    h.append(d);
    h.append(a);
    return h
}
function create_picker(l, c, n, h, e, m)
{
    var g = $("<div class='ui-field-contain' id='" + c + "D' />"), b = h ? "<em>* </em>" : "", d = "<label for='" + c + "'>" + b + n + "</label>", a = $("<input class='qcrm' id='" + c + "' name='Pick" + c + "'>");
    if (m) {
        a.addClass(m)
    }
    g.append(d);
    g.append(a);
    return g
}
function create_text_form(b, c, e, a, d)
{
    return create_input_form("text", b, c, e, false, (a === undefined || a), d)
}
function create_date_form(b, c, d, a)
{
    return create_picker("date", b, c, d, a)
}
function create_datetime_form(b, c, d, a)
{
    return create_picker("datetime", b, c, d, a)
}
function create_number_form(b, c, d, a)
{
    return create_input_form("number", b, c, d, false, a)
}
function create_number_decimal_form(b, c, d, a)
{
    return create_input_form("number", b, c, d, false, a)
}
function create_phone_form(b, c, d, a)
{
    return create_input_form("tel", b, c, d, false, a)
}
function create_email_form(b, c, d, a)
{
    return create_input_form("email", b, c, d, false, a)
}
function create_textarea_form(a, b, d)
{
    var c = $("<div class='ui-field-contain' />");
    c.append("<label for='" + a + "'>" + (d ? "<em>* </em>" : "") + b + "</label>");
    c.append("<textarea name='" + a + "' id='" + a + "'/>");
    return c
}
function get_select_options(l, e, g)
{
    var b, c = "", d = false, h = "---", m = [], a = true;
    if (g || l[""] !== undefined) {
        if (l[""] !== undefined) {
            h = l[""];
            d = true
        }
        c += "<option " + (e === "EMPTY" ? 'selected="selected" ' : "") + 'value="EMPTY">' + h + "</option>"
    }
    for (b in l) {
        if (b !== "" && isNaN(+b)) {
            a = false;
            break
        }
    }
    if (a) {
        for (b in l) {
            if (b !== "" || !d) {
                m.push([b, l[b]])
            }
        }
        m.sort(function(o, n)
        {
            return (+o[0]) < (+n[0]) ? -1 : 1
        });
        for (option in m) {
            b = m[option][0];
            c += "<option " + (e === b ? 'selected="selected" ' : "") + 'value="' + b + '">' + l[b] + "</option>"
        }
    } else {
        for (b in l) {
            if (b !== "" || !d) {
                c += "<option " + (e === b ? 'selected="selected" ' : "") + 'value="' + b + '">' + l[b] + "</option>"
            }
        }
    }
    return c
}
function create_select(b, h, c, d, a, g, l)
{
    var e = "<select name='" + b + "' id='" + b + "' " + ((a || g || l) ? "data-native-menu='false' " : "") + (a === true ? "multiple " : "") + (l ? "data-link='" + l + "' " : "") + (d === true ? "data-mini='true' " : "") + "data-theme='c'>";
    if (h[""] !== undefined) {
        e += "<option " + (c === "EMPTY" ? 'selected="selected" ' : "") + 'value="EMPTY">' + h[""] + "</option>"
    }
    $.each(h, function(n, m)
    {
        if (n !== "") {
            e += "<option " + (c === n ? 'selected="selected" ' : "") + 'value="' + n + '">' + m + "</option>"
        }
    });
    e += "</select>";
    return e
}
function create_enum_form(b, l, m, n, g, e, h)
{
    if (h === undefined) {
        h = false
    }
    var d = $("<div class='ui-field-contain'" + (e ? ' data-mini="true"' : "") + "/>"), a = g ? "<em>* </em>" : "", c = "<label for='" + b + "' class='select'>" + a + l + "</label>";
    if (l !== "") {
        d.append(c)
    }
    d.append(create_select(b, m, h, e, n));
    return d
}
function create_multienum_form2(a, b, e, d, c)
{
    return create_enum_form(a, b, e, true, d, c, "")
}
function create_multienum_form(c, m, n, h, e)
{
    function b(p, q, o)
    {
        p.append('<input type="checkbox" name="' + c + "_" + q + '" id="' + c + "_" + q + '" class="custom" data-theme="c"><label for="' + c + "_" + q + '">' + (o === "" ? "&nbsp;" : o) + "</label>")
    }

    var d = $('<div id="' + c + '"_group data-role="controlgroup"' + (e ? ' data-mini="true"' : "") + "/>"), a = h ? "<em>* </em>" : "", l = "<legend>" + a + m + "</legend>";
    if (m !== "") {
        d.append(l)
    }
    if (n[""] !== undefined) {
        b(d, "", n[""])
    }
    $.each(n, function(g, o)
    {
        if (g !== "") {
            b(d, g.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, ""), o)
        }
    });
    return d
}
function DelUpload(a, b, c)
{
    sugar_mod_fields[b][c].TmpFile = EmptyFile;
    $(a + "D").val("1");
    $(a + "I").val("");
    $(a).val("");
    $(a + "O").empty();
    show_upload(a, true)
}
function CamUpload(a, b, c)
{
    function e()
    {
    }

    function d(l)
    {
        try {
            var g = "picture.jpeg";
            $(a + "D").val("0");
            sugar_mod_fields[b][c].TmpFile = {name: escape(g), contents: "data:image/jpeg;base64," + l};
            $(a).val(g);
            show_upload(a, false);
            $(a + "O").html(['<img class="thumb" src="', "data:image/jpeg;base64," + l, '" title="', g, '"/>'].join(""))
        } catch (h) {
        }
    }

    navigator.camera.getPicture(d, e, {
        quality: QCRM.imageResolution,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    })
}
function handleUpload(d, e, l, b)
{
    var g = b.target.files;
    sugar_mod_fields[e][l].TmpFile = EmptyFile;
    if (!g.length) {
        return
    }
    var h = g[0];
    if (h.type.match("image.*")) {
        var a = new FileReader();
        a.onload = (function(m)
        {
            return function(n)
            {
                $(d + "O").html(['<img class="thumb" src="', n.target.result, '" title="', escape(m.name), '"/>'].join(""))
            }
        })(h);
        a.readAsDataURL(h);
        var c = new FileReader();
        c.onload = (function(m)
        {
            return function(o)
            {
                var n = btoa(o.target.result);
                $(d + "D").val("0");
                sugar_mod_fields[e][l].TmpFile = {name: escape(m.name), contents: n, mime_type: h.type};
                $(d).val(m.name);
                show_upload(d, false);
                if (!h.type.match("image.*")) {
                }
            }
        })(h);
        c.readAsBinaryString(h)
    } else {
        $(d).val("");
        $(d + "I").val("");
        $(d + "O").html("Not an image: " + h.type);
        sugar_mod_fields[e][l].TmpFile = EmptyFile
    }
}
function show_upload(b, a)
{
    if (a) {
        $(b + "DBtn").hide();
        if (!mobile_app) {
            $(b + "I").show()
        }
        if (mobile_app) {
            $(b + "C").show()
        }
    } else {
        $(b + "DBtn").show();
        if (!mobile_app) {
            $(b + "I").hide()
        }
        if (mobile_app) {
            $(b + "C").hide()
        }
    }
}
function create_upload(e, a, b, h, g, d)
{
    if (!OptUpload || !QCRM.imageFields[g.type]) {
        return false
    }
    var c = '<div class="ui-field-contain"><label for="' + e + '">' + a + '</label><input type="text" name="' + e + '" id="' + e + '" readonly="readonly" data-theme="c" ><input type="hidden" id="' + e + 'D"></div><div class="ui-field-contain"><label for="' + e + 'C"></label>';
    if (mobile_app) {
    }
    if (!mobile_app) {
        c += '<input type="file" name="' + e + 'I" id="' + e + 'I" data-theme="c" >'
    }
    c += '<a id="' + e + 'DBtn" href="javascript:DelUpload(\'#' + e + "','" + b + "','" + h + '\');" data-role="button" data-mini="true" data-theme="c" data-inline="true" >' + sugar_app_strings.LBL_DELETE_BUTTON_LABEL + "</a>";
    c += '</div><output id="' + e + 'O"></output>';
    if (d) {
        c = "<form>" + c + "</form>"
    }
    g.TmpFile = EmptyFile;
    g.add_listener = function()
    {
        if (mobile_app) {
        } else {
            document.getElementById(e + "I").addEventListener("change", function(l)
            {
                handleUpload("#" + e, b, h, l)
            }, false)
        }
    };
    g.after_save = function(n, m)
    {
        var l = $("#" + e + "D").val() == "1";
        if (l || ($("#" + e + "D").val() != "" && g.TmpFile.contents != "")) {
            QCRM.set_image((l ? "" : g.TmpFile.contents), g.TmpFile.mime_type, m[h].value, b, n, h, g.type, l, function(o)
            {
            });
            return true
        }
        return false
    };
    return c
}
function create_drawing(b, c, h)
{
    var a = (h.height === "") ? 250 : parseInt(h.height.replace("px", ""), 10), d = (h.width === "") ? 300 : parseInt(h.width.replace("px", ""), 10), g, e;
    if (d > QCRM.DrawingWidth) {
        a = Math.round(a * QCRM.DrawingWidth / d);
        d = QCRM.DrawingWidth
    }
    g = 70 + a;
    e = '<div class="drawing_block" id="@@_wrapper"><div class="drawing_top_tools"><span class="drawing_tool_general">&nbsp;</span><a id="@@_tool_clear" class="drawing_tool_general drawing_tool_clear" href="#" title="' + sugar_app_strings.LBL_DRAWING_CLEAR + '">&nbsp;</a><a id="@@_tool_reinit" class="drawing_tool_general drawing_tool_reinit" href="#" title="' + sugar_app_strings.LBL_DRAWING_REINIT + '">&nbsp;</a><a id="@@_tool_undo" class="drawing_tool_general drawing_tool_undo" href="#" title="' + sugar_app_strings.LBL_DRAWING_UNDO + '">&nbsp;</a>&nbsp;&nbsp;&nbsp;<a id="@@_tool_eraser" class="drawing_tool_brush drawing_tool_eraser" href="#" title="' + sugar_app_strings.LBL_DRAWING_ERASER + '">&nbsp;</a><a id="@@_tool_hand" class="drawing_tool_brush drawing_tool_hand drawing_tool_selected" href="#" title="' + sugar_app_strings.LBL_DRAWING_HAND + '">&nbsp;</a><a id="@@_tool_line" class="drawing_tool_brush drawing_tool_line drawing_nosign" href="#" title="' + sugar_app_strings.LBL_DRAWING_LINE + '">&nbsp;</a><a id="@@_tool_rect" class="drawing_tool_brush drawing_tool_rect drawing_nosign" href="#" title="' + sugar_app_strings.LBL_DRAWING_RECT + '">&nbsp;</a><a id="@@_tool_ellipse" class="drawing_tool_brush drawing_tool_ellipse drawing_nosign" href="#" title="' + sugar_app_strings.LBL_DRAWING_ELLIPSE + '">&nbsp;</a><a id="@@_tool_text" class="drawing_tool_brush drawing_tool_text" href="#" title="' + sugar_app_strings.LBL_DRAWING_TEXT + '">&nbsp;</a></div><div class="drawing" style="width:' + d.toString() + "px;height:" + g.toString() + 'px"><div class="drawing_left_tools"><span class="drawing_tool_font">' + sugar_app_strings.LBL_DRAWING_TEXTINPUT + '&nbsp;&nbsp;</span><input id="@@_tool_textinput" class="drawing_tool_font" value="" ><br/><span class="drawing_tool_font">' + sugar_app_strings.LBL_DRAWING_FONTSIZE + '&nbsp;&nbsp;</span><a id="@@_tool_fontsmall" class="drawing_tool_font" href="#">' + sugar_app_strings.LBL_DRAWING_FONTSMALL + '</a><a id="@@_tool_fontmedium" class="drawing_tool_font drawing_tool_selected" href="#">' + sugar_app_strings.LBL_DRAWING_FONTMEDIUM + '</a><a id="@@_tool_fontlarge" class="drawing_tool_font" href="#">' + sugar_app_strings.LBL_DRAWING_FONTLARGE + '</a></div><br/><canvas id="@@_canvas" name="@@_canvas" class="drawing_canvas" style="width:' + d.toString() + "px;height:" + a.toString() + 'px"></canvas></div><div style="clear:both"/><div class="drawing_right_tools drawing_nosign"><span class="drawing_tool_width">' + sugar_app_strings.LBL_DRAWING_STROKEWIDTH + '</span><a id="@@_tool_width1" class="drawing_tool_width" href="#">' + sugar_app_strings.LBL_DRAWING_WIDTH1 + '</a><a id="@@_tool_width3" class="drawing_tool_width drawing_tool_selected " href="#">' + sugar_app_strings.LBL_DRAWING_WIDTH3 + '</a><a id="@@_tool_width5" class="drawing_tool_width" href="#">' + sugar_app_strings.LBL_DRAWING_WIDTH5 + '</a><a id="@@_tool_width10" class="drawing_tool_width" href="#">' + sugar_app_strings.LBL_DRAWING_WIDTH10 + '</a><span class="drawing_tool_color">' + sugar_app_strings.LBL_DRAWING_STROKECOLORS + '</span><a id="@@_tool_black" class="drawing_tool_color drawing_tool_black drawing_tool_selected" href="#" title="' + sugar_app_strings.LBL_DRAWING_BLACK + '">&nbsp;</a><a id="@@_tool_red" class="drawing_tool_color drawing_tool_red" href="#" title="' + sugar_app_strings.LBL_DRAWING_RED + '">&nbsp;</a><a id="@@_tool_green" class="drawing_tool_color drawing_tool_green" href="#" title="' + sugar_app_strings.LBL_DRAWING_GREEN + '">&nbsp;</a><a id="@@_tool_blue" class="drawing_tool_color drawing_tool_blue" href="#" title="' + sugar_app_strings.LBL_DRAWING_BLUE + '">&nbsp;</a><span class="drawing_tool_fillcolor">' + sugar_app_strings.LBL_DRAWING_FILLCOLORS + '</span><a id="@@_tool_fillnone" class="drawing_tool_fillcolor drawing_tool_none" href="#" title="' + sugar_app_strings.LBL_DRAWING_FILLNONE + '">&nbsp;</a><a id="@@_tool_fillblack" class="drawing_tool_fillcolor drawing_tool_black drawing_tool_selected" href="#" title="' + sugar_app_strings.LBL_DRAWING_FILLBLACK + '">&nbsp;</a><a id="@@_tool_fillred" class="drawing_tool_fillcolor drawing_tool_red" href="#" title="' + sugar_app_strings.LBL_DRAWING_FILLRED + '">&nbsp;</a><a id="@@_tool_fillgreen" class="drawing_tool_fillcolor drawing_tool_green" href="#" title="' + sugar_app_strings.LBL_DRAWING_FILLGREEN + '">&nbsp;</a><a id="@@_tool_fillblue" class="drawing_tool_fillcolor drawing_tool_blue" href="#" title="' + sugar_app_strings.LBL_DRAWING_FILLBLUE + '">&nbsp;</a></div><input type="hidden" id="@@" name="@@" value="" ><input type="hidden" id="@@_delete" name="@@_delete" value="0" ></div><div style="clear:left"/>', f = $("<div class='ui-field-contain'/>"), lab = "<label for='" + b + "'>" + c + "</label>", ctrl = e.replace(/@@/g, b);
    f.append(lab);
    f.append(ctrl);
    return f
}
function init_labels(d, a)
{
    for (var c in a) {
        var b = "", e = a[c];
        if (sugar_mod_fields[d][e] !== undefined && sugar_mod_fields[d][e].req) {
            b = "<em>* </em>"
        }
        $('label[for="Edit' + d + "_" + e + '"]').html(b + display_label(d, e))
    }
}
function CopyFieldsFromRelated(c, b, e, a)
{
    function d(h, g, m)
    {
        if (m === "duration_minutes" || m === "duration_hours") {
            h.selectmenu("refresh")
        } else {
            var l = sugar_mod_fields[g][m];
            if (l) {
                if (l.type === "enum") {
                    h.selectmenu("refresh")
                }
            }
        }
    }

    $.each(c, function(g, o)
    {
        var l;
        if (add_prefixes.indexOf(o.from) !== -1 && add_prefixes.indexOf(o.copy) !== -1) {
            for (var p in QCRM.addressFields) {
                var n = QCRM.addressFields[p], h = o.from + "_address_" + n;
                l = $(e + o.copy + "_address_" + n);
                if (l && b[h]) {
                    l.val(b[h].value)
                }
            }
        } else {
            l = $(e + o.copy);
            if (l) {
                var q = true;
                try {
                    if (typeof o.compute === "function") {
                        l.val(o.compute(b))
                    } else {
                        if (typeof o.fnct === "function") {
                            l.val(o.fnct(b))
                        } else {
                            if (b[o.from]) {
                                l.val(b[o.from].value)
                            } else {
                                q = false
                            }
                        }
                    }
                    if (q) {
                        d(l, a, o.copy)
                    }
                } catch (m) {
                }
            }
        }
    })
}
function CopyFieldsToRelated(b, a, c)
{
    $.each(b, function(d, m)
    {
        var g;
        if (add_prefixes.indexOf(m.from) !== -1 && add_prefixes.indexOf(m.copy) !== -1) {
            for (var n in QCRM.addressFields) {
                var l = QCRM.addressFields[n], e = m.from + "_address_" + l;
                g = $(c + m.copy + "_address_" + l);
                if (g && g.val() !== "") {
                    a[e] = {name: e, value: g.val()}
                }
            }
        } else {
            g = $(c + m.copy);
            if (g) {
                try {
                    if (typeof m.compute === "function") {
                    } else {
                        if (typeof m.fnct === "function") {
                        } else {
                            if (g.val() !== "") {
                                a[m.from] = {name: m.from, value: g.val()}
                            }
                        }
                    }
                } catch (h) {
                }
            }
        }
    })
}
function pickRelate(o, g, m, n, c, e, b, l, w)
{
    var u = (b === "Search"), a = "#" + (b === "" || b === "Search" ? (b + o + "_") : b), v = $(a + m), q = v.val(), r = $(a + m + "L"), d = Beans[n], h = [], p;
    if (w === undefined) {
        w = 1
    }
    $(a + g).val("");
    $("#" + o + "parentJJWG").val("");
    function s(C, B, A)
    {
        $(a + g).val(C);
        if (b !== "Search") {
            CopyFieldsFromRelated(e, B, a, n);
            if (o == "Meetings" && JJWG.modules.indexOf(o) != -1 && JJWG.modules.indexOf(n) != -1 && B.jjwg_maps_geocode_status_c) {
                JJWG.encodeFields(o, o + "parentJJWG", B)
            }
        }
        v.val(A.replace(/&#039;/g, "'").replace(/&quot;/g, '"'));
        if (!iOS) {
            if (document.activeElement) {
                document.activeElement.blur()
            }
        }
        r.html("");
        r.listview("refresh");
        if (l !== undefined) {
            l(C, q)
        }
    }

    function z(G)
    {
        if (!G) {
            return
        }
        var C = G.entry_list, E = C.length;
        r.html("");
        for (var D = 0; D < E; D++) {
            var F = $('<li data-icon="false"/>'), I = C[D].name_value_list, A = $("<a/>", {href: "#"}), B = d.DisplayTitle(I), H = d.DisplayTitleExtended(I);
            A.click({id: C[D].id, nvl: I, name: B}, function(J)
            {
                s(J.data.id, J.data.nvl, J.data.name)
            });
            A.append(H);
            F.append(A);
            r.append(F)
        }
        r.listview().listview("refresh")
    }

    if (q.length < w) {
        r.html("");
        r.listview().listview("refresh");
        if (l !== undefined) {
            l("", "")
        }
    } else {
        if (d === undefined) {
            d = SimpleBeans[n];
            d.search(q, z)
        } else {
            p = matchName(d, "default", q.replace(/'/g, "''"));
            if (typeof c === "function") {
                c = c("#" + b)
            }
            if (c) {
                p += (c !== "" ? ((p == "" ? "" : " AND ") + "(" + c + ")") : "")
            }
            QCRM.get_entry_list(n, p, d.ListFieldsToSelect(h), "", 0, QCRM.maxPickRelate, d.OrderBy, z)
        }
    }
}
function get_parent_types(b)
{
    var d = {}, a = sugar_app_list_strings.parent_type_display, c;
    if (b && b.options && sugar_app_list_strings[b.options]) {
        a = sugar_app_list_strings[b.options]
    }
    $.each(a, function(g, e)
    {
        if (g !== "") {
            if (Beans[g] !== undefined && Beans[g].Enabled()) {
                d[g] = e
            }
        }
    });
    return d
}
function init_add_form(a, F, r, e, B)
{
    var L = B && B.substring(0, 3) == "IE_";
    if (r === undefined) {
        r = []
    }
    if (e === undefined) {
        e = $("#Edit" + a + "Additional")
    }
    if (B === undefined) {
        B = "Edit" + a + "_"
    }
    for (var K in F) {
        var I = F[K], u = sugar_mod_fields[a][I], G = false, s = false;
        if (I.substring(0, 4) === "$ADD") {
            var N = I.substring(4);
            init_add_form(a, getAddressFields(N, a), [], e, B);
            continue
        }
        if (u === undefined) {
            continue
        }
        if (u.readonly !== undefined && (u.readonly === true || u.type === "readonly")) {
            s = true
        }
        if ((u.source === "non-db" && u.type !== "Drawing") || r.indexOf(I) !== -1) {
            continue
        }
        if (u.create_edit) {
            u.create_edit(a, I, e, B);
            continue
        }
        if (I === "duration_minutes") {
            continue
        }
        if (I === "duration_hours") {
            init_add_form_duration(a, "duration_hours", "duration_minutes", RES_DURATION_LABEL, e, B);
            continue
        }
        var p = B + I, q;
        if (u.init_form !== undefined) {
            G = u.init_form()
        } else {
            switch (u.type) {
                case"name":
                case"varchar":
                case"char":
                case"iframe":
                case"url":
                    G = create_text_form(p, display_label(a, I), u.req, !s);
                    break;
                case"enum":
                    G = create_enum_form(p, display_label(a, I), sugar_app_list_strings[u.options], false, u.req, false);
                    if (u.parentenum !== undefined) {
                        if (Beans[a].AdditionalFields.indexOf(u.parentenum) !== -1) {
                            $("#" + B + u.parentenum).bind("change", {m: a, f: u.parentenum, subf: I}, function(b)
                            {
                                updateDynamicEnum(b.data.m, b.data.f, b.data.subf)
                            })
                        }
                    }
                    break;
                case"date":
                    G = create_date_form(p, display_label(a, I), u.req, !s);
                    break;
                case"datetime":
                    G = create_datetime_form(p, display_label(a, I), u.req, !s);
                    break;
                case"int":
                    G = create_number_form(p, display_label(a, I), u.req, !s);
                    break;
                case"currency":
                case"float":
                case"decimal":
                case"double":
                    G = create_number_decimal_form(p, display_label(a, I), u.req, !s);
                    break;
                case"bool":
                case"boolean":
                    G = $("<div class='ui-field-contain' id='" + B + I + "div'/>");
                    var m = u.req ? "<em>* </em>" : "", E = $('<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true"/>');
                    q = "<legend>" + m + sugar_mod_strings[a][sugar_mod_fields[a][I].label] + '</legend><input type="radio" name="' + B + I + '" id="' + B + I + '0" value="0" checked="checked"  data-theme="c"><label for="' + B + I + '0">' + RES_NO_LABEL + '</label><input type="radio" name="' + B + I + '" id="' + B + I + '1" value="1" data-theme="c"><label for="' + B + I + '1">' + RES_YES_LABEL + "</label>";
                    E.html(q);
                    G.append(E);
                    break;
                case"text":
                    G = create_textarea_form(p, display_label(a, I), u.req);
                    break;
                case"email":
                    G = create_email_form(p, display_label(a, I), u.req, !s);
                    break;
                case"phone":
                    G = create_phone_form(p, display_label(a, I), u.req, !s);
                    break;
                case"relate":
                    var l = u.module, A = (l === "Accounts" && B == ("Edit" + a + "_")), M = a + I + "C", o, C, h = u.copyfields === undefined ? [] : u.copyfields, H = (L || Q_API < "3.0") ? "" : u.initial_filter;
                    if (Beans[l] !== undefined && Beans[l].Enabled()) {
                        G = create_text_form(p, display_label(a, I), u.req, !s, true);
                        G.append('<ul id="' + B + I + 'L" data-role="listview" data-inset="true" data-theme="c"/><input type="hidden" name="' + B + u.id_name + '" id="' + B + u.id_name + '">');
                        if (A) {
                            C = $('<div id="' + M + 'G" data-role="controlgroup" data-type="horizontal"><legend>&nbsp;</legend></div>');
                            o = $('<a id="' + M + '" href="#" ' + button_defaults + ">" + sugar_mod_strings[l].NEW + "</a>");
                            o.click({newmod: l, field: I, mod: a, idfield: u.id_name}, function(b)
                            {
                                CreateFromEditForm(b.data.newmod, b.data.mod, b.data.field, b.data.idfield)
                            });
                            C.append(o);
                            G.append(C)
                        }
                        G.on("input", (function(c, g, R, P, Q, b, d, O)
                        {
                            return function(T)
                            {
                                var S;
                                if (d) {
                                    S = $("#" + c + R + "CG");
                                    S.show()
                                }
                                pickRelate(c, g, R, P, O, Q, b, function(V, U)
                                {
                                    if (d) {
                                        if (V == "" && U != "") {
                                            S.show()
                                        } else {
                                            S.hide()
                                        }
                                    }
                                })
                            }
                        })(a, u.id_name, I, u.module, h, B, A, H || ""))
                    } else {
                        if (SimpleBeans[l] !== undefined) {
                            q = {};
                            if ((I !== "assigned_user_name") && !u.req) {
                                q[""] = " ---- "
                            }
                            for (var n in SimpleBeans[u.module].List) {
                                q[n] = SimpleBeans[u.module].List[n]
                            }
                            G = create_enum_form(p, display_label(a, I), q, false, u.req, false)
                        }
                    }
                    break;
                case"parent":
                    G = $("<div class='ui-field-contain'/>");
                    var J = $("<div class='ui-grid-a'/>"), z = $("<div class='ui-block-a'/>"), w = $("<div class='ui-block-b'/>"), D = $(create_select(B + u.id_type, get_parent_types(u), "Accounts", true)), v = $('<input type="text" id="' + B + I + '">');
                    D.bind("change", {m: a, n: I, i: u.id_name}, function(b)
                    {
                        $("#" + B + b.data.n).val("");
                        $("#" + B + b.data.i).val("")
                    });
                    v.on("input", (function(c, d, P, g, O, b)
                    {
                        return function(R)
                        {
                            var S = $("#" + B + g).val(), Q = (O !== undefined && O[S] !== undefined) ? O[S] : [];
                            pickRelate(c, d, P, S, "", Q, b)
                        }
                    })(a, u.id_name, I, u.id_type, u.copyfields, B));
                    z.append(D);
                    w.append(v);
                    J.append(z);
                    J.append(w);
                    G.html('<label for="prefix+fielddef.id_type">' + (u.req ? "<em>* </em>" : "") + sugar_mod_strings[a][sugar_mod_fields[a][I].label] + "</label>");
                    G.append(J);
                    G.append('<input type="hidden" name="' + B + u.id_name + '" id="' + B + u.id_name + '"><ul id="' + B + I + 'L" data-role="listview" data-inset="true" data-theme="c"/>');
                    break;
                case"multienum":
                    G = create_multienum_form(p, display_label(a, I), sugar_app_list_strings[u.options], u.req, false);
                    break;
                case"Drawing":
                    if (L) {
                        G = create_drawing(p, display_label(a, I), u)
                    }
                    break;
                case"image":
                case"photo":
                    G = create_upload(p, display_label(a, I), a, I, u, L);
                    break;
                default:
                    break
            }
        }
        if (G !== false) {
            e.append(G);
            if (s) {
                QCRM.SetFieldReadonly(a, I, true)
            }
            if (u.add_listener) {
                u.add_listener()
            }
        }
    }
}
function init_add_form_duration(d, p, n, o, q, h)
{
    var m = $("<div class='ui-field-contain'/>"), l = $("<fieldset data-role='controlgroup' data-mini='true' data-type='horizontal'/>"), b = "";
    l.append("<legend><em>* </em>" + o + "</legend>");
    var e = "<label for='" + h + p + "' class='select'>" + b + display_label(d, p) + "</label>", c = $("<select name='" + h + p + "' id='" + h + p + "' data-theme='c'/>");
    for (var a in ["0", "1", "2", "3", "4", "5", "6", "7", "8"]) {
        c.append($("<option value='" + a + "'/>").append(a + " h"))
    }
    l.append(e);
    l.append(c);
    e = "<label for='" + h + n + "' class='select'>" + b + display_label(d, n) + "</label>";
    c = create_select(h + n, sugar_app_list_strings.duration_intervals, "0", false, false);
    l.append(e);
    l.append(c);
    m.append(l);
    q.append(m)
}
function onChangeDateEnum(a)
{
    if ($("#" + a + "E").val() == "between") {
        $("#" + a + "FromTo").show()
    } else {
        $("#" + a + "FromTo").hide()
    }
}
function init_search_fields(g, h, o)
{
    var B, n = $("#" + g + "DivMoreOptions");
    if (o) {
        n = $("#" + g + o)
    }
    for (B in h) {
        var z = h[B], p = sugar_mod_fields[g][z], w, m, a = "Search" + g + "_" + z;
        if (p == undefined) {
            continue
        } else {
            if (p.init_search) {
                w = p.init_search(g)
            } else {
                switch (p.type) {
                    case"name":
                    case"varchar":
                    case"char":
                    case"text":
                    case"email":
                    case"phone":
                        w = create_text_form(a, display_label(g, z), false, true, true);
                        break;
                    case"enum":
                    case"dynamicenum":
                    case"multienum":
                        if (p.singleSelect) {
                            w = create_enum_form(a, display_label(g, z), sugar_app_list_strings[p.options], false, true)
                        } else {
                            w = create_multienum_form2(a, display_label(g, z), sugar_app_list_strings[p.options], false, true)
                        }
                        break;
                    case"date":
                    case"datetime":
                        m = create_enum_form(a + "E", display_label(g, z), sugar_app_list_strings.date_search, false, false, true, "=");
                        m.change({ctrl: a}, function(b)
                        {
                            onChangeDateEnum(b.data.ctrl)
                        });
                        w = $("<div/>");
                        w.append(m);
                        m = $('<div id="' + a + 'FromTo" class="from-to-div" style="display: none;"/>');
                        m.append(create_picker("date", a + "From", RES_SEARCH_FROM, false, true, "qcrm_fromto"));
                        m.append(create_picker("date", a + "To", RES_SEARCH_TO, false, true, "qcrm_fromto"));
                        w.append(m);
                        break;
                    case"currency":
                    case"int":
                    case"float":
                    case"decimal":
                    case"double":
                        m = "<legend>" + display_label(g, z) + "</legend>";
                        w = $('<div id="Search' + g + "_" + z + '"_group data-role="controlgroup" data-mini="true" />');
                        w.append(m);
                        w.append(create_number_form(a + "From", ">=", false, true));
                        w.append(create_number_form(a + "To", "<=", false, true));
                        break;
                    case"bool":
                    case"boolean":
                        w = create_enum_form(a, sugar_mod_strings[g][sugar_mod_fields[g][z].label], {
                            "": " --- ",
                            "1": RES_YES_LABEL,
                            "0": RES_NO_LABEL
                        }, false, false, true, " ");
                        break;
                    case"relate":
                        if (z === "assigned_user_name" && QCRM.multiple_assigned) {
                            w = create_enum_form(a, sugar_mod_strings[g][sugar_mod_fields[g][z].label], SimpleBeans[p.module].List, true, false, true, "")
                        } else {
                            if (Beans[p.module] === undefined) {
                                m = {};
                                m[""] = " ---- ";
                                for (var l in SimpleBeans[p.module].List) {
                                    m[l] = SimpleBeans[p.module].List[l]
                                }
                                w = create_enum_form(a, sugar_mod_strings[g][sugar_mod_fields[g][z].label], m, false, false, true, "")
                            } else {
                                w = create_text_form(a, display_label(g, z), false, true, true);
                                var e = "Search" + g + "_" + p.id_name;
                                w.append('<ul id="Search' + g + "_" + z + 'L" data-role="listview" data-inset="true" data-theme="c"/><input type="hidden" name="' + e + '" id="' + e + '">');
                                if (Q_API < "3.0" && p.source == "non-db") {
                                    w.hide()
                                } else {
                                    w.on("input", (function(b, c, C, d)
                                    {
                                        return function(D)
                                        {
                                            pickRelate(b, c, C, d, "", [], "Search")
                                        }
                                    })(g, p.id_name, z, p.module))
                                }
                            }
                        }
                        break;
                    case"parent":
                        w = $("<div class='ui-field-contain'/>");
                        var u = "Search" + g + "_", A = $("<div class='ui-grid-a'/>"), s = $("<div class='ui-block-a'/>"), r = $("<div class='ui-block-b'/>"), v = $(create_select(u + p.id_type, get_parent_types(p), "Accounts", true)), q = $('<input type="text" id="' + u + z + '">');
                        s.append(v);
                        r.append(q);
                        A.append(s);
                        A.append(r);
                        w.html("<p>" + (p.req ? "<em>* </em>" : "") + sugar_mod_strings[g][sugar_mod_fields[g][z].label] + "</p>");
                        w.append(A);
                        w.append('<input type="hidden" name="' + u + p.id_name + '" id="' + u + p.id_name + '"><ul id="' + u + z + 'L" data-role="listview" data-inset="true" data-theme="c"/>');
                        if (Q_API < "3.0") {
                            w.hide()
                        } else {
                            v.bind("change", {m: g, n: z, i: p.id_name}, function(b)
                            {
                                $("#" + u + b.data.n).val("");
                                $("#" + u + b.data.i).val("")
                            });
                            q.on("input", (function(b, c, C, d)
                            {
                                return function(D)
                                {
                                    var E = $("#" + u + d).val();
                                    pickRelate(b, c, C, E, "", [], "Search")
                                }
                            })(g, p.id_name, z, p.id_type))
                        }
                        break;
                    default:
                        break
                }
            }
        }
        n.append(w);
        if (p.type === "date" || p.type === "datetime") {
            init_picker("#" + a + "From", "date", "");
            init_picker("#" + a + "To", "date", "")
        }
    }
}
function init_search_form(c, h)
{
    var a, g = $("#" + c + "DivMoreOptions");
    init_search_fields(c, h);
    g.append(createSortOrderDropdown("SOrder" + c, RES_SORTORDER, c));
    var e, l;
    g.append(create_text_form(c + "SaveAs", RES_SAVESEARCH, false, false));
    l = $('<div class="ui-grid-b" id="' + c + 'SBtns" style="display:none;"/>');
    if (Beans.QCRM_SavedSearch !== undefined) {
        if (!sugar_app_strings.LBL_SHARE_PRIVATE) {
            sugar_app_strings.LBL_SHARE_PRIVATE = "Private"
        }
        l.append($("<div id='PUBD" + c + "' class='ui-block-a'/>").append('<select name="PUB' + c + '" id="PUB' + c + '" data-mini="true" data-role="slider" data-track-theme="c" data-theme="d"><option value="0">' + sugar_app_strings.LBL_SHARE_PRIVATE + '</option><option value="1">' + sugar_app_strings.LBL_SHARE_PUBLIC + "</option></select>"))
    }
    l.append($("<div class='ui-block-b'/>").append('<a id="' + c + 'SSaveBtn" href="#" ' + button_defaults + ">" + sugar_app_strings.LBL_SAVE_BUTTON_LABEL + '</a><span id="' + c + 'SaveSaved" style="color:red;display:none;">' + sugar_app_strings.LBL_SAVED + "</span>"));
    g.append(l);
    l = $('<div id="' + c + 'HSavedT" style="display:none;"/>');
    e = $('<div data-role="controlgroup" data-type="horizontal" data-mini="true" />');
    e.append("<legend>" + RES_HOME_LABEL + '</legend><input type="radio" name="' + c + 'HSavedS" id="HSavedN' + c + '"  value="N" checked="checked" data-theme="c"><label for="HSavedN' + c + '">' + RES_NONE + '</label><input type="radio" name="' + c + 'HSavedS" id="HSavedI' + c + '"  value="I" data-theme="c"><label for="HSavedI' + c + '">' + RES_ICON + '</label><input type="radio" name="' + c + 'HSavedS" id="HSavedD' + c + '"  value="D" data-theme="c"><label for="HSavedD' + c + '">Dashlet</label>');
    l.append($('<div class="ui-field-contain"/>').append(e));
    g.append(l);
    $("#" + c + "SaveAs").bind("keyup change", function()
    {
        ClearSavedSearch(c, true)
    });
    $("#" + c + "SSaveBtn").click({val: c}, function(b)
    {
        SaveSearch(b.data.val)
    });
    $("input[name='" + c + "HSavedS']").bind("change", function(d)
    {
        var b = $("#" + c + "ES").val();
        if (b !== "0" && QCRM.SavedSearches[b]) {
            updateIconOrDashlet(c, b);
            SaveHomePageDef();
            updateDashlets()
        }
        QCRM.UpdFavIcons = true
    })
}
function SavedSearchToggle(b, d)
{
    var c = $("#" + b + "SBtns"), a = $("#" + b + "ES").val();
    if ($("#" + b + "SaveAs").val().trim().length > 0 && !d) {
        c.show()
    } else {
        c.hide()
    }
    if (a !== undefined && a !== "0") {
        $("#" + b + "HSavedT").show()
    } else {
        $("#" + b + "HSavedT").hide()
    }
    if (Beans.QCRM_SavedSearch !== undefined) {
        if ((db_type !== "mssql") && (UserIsAdmin || QCRM.share_search === "All" || (typeof QCRM.share_search === "object" && QCRM.share_search.indexOf(CurrentUserId) !== -1))) {
            $("#PUBD" + b).show()
        } else {
            $("#PUBD" + b).hide()
        }
    }
}
function getSavedSearchList(b, g)
{
    var d = QCRM.SavedSearches, e = true, h = {"0": " --- "};
    if (g) {
        h.ALL = sugar_app_strings.LBL_LISTVIEW_ALL || "All"
    }
    for (var a in d) {
        var c = d[a];
        if (c && c.type === b && c.name && c.name !== "") {
            e = false;
            h[a] = c.name
        }
    }
    if (e) {
        return false
    } else {
        return h
    }
}
function SavedSearchEnum(c, a)
{
    var h, b = $("#" + c + "SS"), l = $("#filters" + c);
    lstopt = getSavedSearchList(c);
    lstopt2 = getSavedSearchList(c, true);
    if (lstopt === false) {
        b.hide();
        l.hide()
    } else {
        b.empty();
        l.empty();
        var g = create_enum_form(c + "ES", RES_SAVEDSEARCH + " ", lstopt, false, false, true, a), d = $(create_select(c + "ES", lstopt2, a, true, false, false, false));
        g.change(function(e, m)
        {
            onChangeSearch(c)
        });
        d.change(function(e, n)
        {
            var m = $(this).val();
            $("#" + c + "ES").val(m);
            if (m != "0") {
                if (m == "ALL") {
                    clearSearchValues(c)
                }
                onChangeSearch(c);
                SaveLastSearch(c)
            }
            StartSearch(c)
        });
        l.append(d);
        b.append(g);
        g = $('<div id="' + c + 'SSDN"/>');
        h = $("<a/>", {
            href: "#", click: function()
            {
                DelCurrentSavedSearch(c)
            }
        });
        h.text(sugar_app_strings.LBL_DELETE_BUTTON_LABEL);
        g.append(h);
        g.append("&nbsp;&nbsp;&nbsp;");
        h = $("<a/>", {
            href: "#Rename", click: function()
            {
                OpenRename($("#" + c + "SaveAs").val(), c, "", RenCurrentSavedSearch)
            }
        });
        h.text(RES_RENAME);
        g.append(h);
        b.append(g);
        if (a === "") {
            g.hide()
        } else {
            g.show()
        }
        b.show();
        l.show()
    }
}
function StartSearch(c)
{
    var a = Beans[c], b = readSortOrderDropdown("SOrder" + c, c);
    a.CurrentSearchValues = readSearchValues(c);
    if (b !== a.CurrentSearchOrder) {
        a.CurrentSearch = false;
        a.CurrentSearchOrder = b
    }
    SaveMyItems(c, $("#" + c + "MyItems").is(":checked"));
    if ($("body").pagecontainer("getActivePage").attr("id") == (c + "ListPage")) {
        a.GetList(a.CurrentOffset)
    } else {
        $("body").pagecontainer("change", "#" + c + "ListPage")
    }
}
function SaveSearch(b)
{
    var c = $("#" + b + "SaveSaved"), a;
    SaveMyItems(b, $("#" + b + "MyItems").is(":checked"));
    a = updateSavedSearch(b, readSearchValues(b), readSortOrderDropdown("SOrder" + b, b));
    SavedSearchEnum(b, a === false ? "" : a);
    SavedSearchToggle(b);
    c.show();
    setTimeout(function()
    {
        c.hide()
    }, 2000)
}
function SaveLastSearch(b)
{
    var a = {values: readSearchValues(b), order: readSortOrderDropdown("SOrder" + b, b)};
    localStorage.setItem(ServerAddress + "LS" + b, JSON.stringify(a))
}
function LoadLastSearch(b)
{
    var a = localStorage.getItem(ServerAddress + "LS" + b);
    if (a !== null && a != "") {
        a = jQuery.parseJSON(a);
        loadSearchFields(b, a.values, a.order);
        Beans[b].CurrentSearchValues = a.values;
        Beans[b].CurrentSearchOrder = a.order
    }
}
function readSearchValues(d)
{
    var a = [], g = d + "DivMoreOptions", c = d + "basic_search", e = d + "SaveAs";
    var b = "Settings" + d + "Search";
    a.push({field: b, type: "txt", val: $("#" + b).val()});
    $("#" + g + " [type=checkbox], #" + c + " [type=checkbox]").each(function(l, h)
    {
        a.push({field: this.id, type: "chk", val: $(this).is(":checked")})
    });
    $("#" + g + " input[type!=checkbox], #" + c + " input[type!=checkbox]").each(function(l, h)
    {
        var n = $(this).val();
        if (this.name !== "" && n !== "" && this.name.substring(0, 4) === "Pick") {
            var m = $(this).mobiscroll("getDate");
            if (m !== null && h !== "") {
                n = toDBDate(m)
            }
        }
        if (this.id.substring(0, 3) !== "HSa" && this.id !== e) {
            a.push({field: this.id, type: "txt", val: n})
        }
    });
    $("#" + g + " select, #" + c + " select").each(function(l, h)
    {
        a.push({field: this.id, type: "sel", val: $(this).val()})
    });
    return a
}
function clearSearchValues(d)
{
    var h = d + "DivMoreOptions", c = d + "basic_search", a = Beans[d].SearchFields.concat(Beans[d].basic_search), b, g, e;
    $("#" + h + " [type=checkbox], #" + c + " [type=checkbox]").each(function(m, l)
    {
        $(this).prop("checked", false).checkboxradio("refresh")
    });
    $("#" + h + " input[type!=checkbox], #" + c + " input[type!=checkbox]").each(function(m, l)
    {
        if (this.name && this.name.substring(0, 4) === "Pick") {
            $(this).mobiscroll("setDate", new Date(), false)
        } else {
            $(this).val("")
        }
    });
    $("#" + h + " select, #" + c + " select").each(function(m, l)
    {
        $("#" + this.id + " option").prop("selected", false);
        $("#" + this.id + " option:first").prop("selected", "selected");
        if (this.id === ("PUB" + d)) {
            $(this).slider("refresh")
        } else {
            try {
                $(this).selectmenu("refresh")
            } catch (n) {
            }
        }
    });
    for (b in a) {
        g = a[b];
        e = sugar_mod_fields[d][g];
        if (e !== undefined && ((g === "assigned_user_name" && QCRM.multiple_assigned) || e.type === "enum" || e.type === "multienum")) {
            set_multienum_val("#Search" + d + "_" + g, [])
        }
    }
    ClearSavedSearch(d);
    loadSortOrderDropdown(d, Beans[d].OrderBy);
    $("#SForm" + d + " .from-to-div").hide()
}
function SavedSearchDisplayType(a)
{
    if (QCRM.DashletMember(QCRM.Dashlets, a)) {
        return "D"
    } else {
        if (QCRM.DashletMember(QCRM.searchIcons, a)) {
            return "I"
        }
    }
    return "N"
}
function loadSearchFields(b, e, c)
{
    var h = b + "SaveAs", m = "PUB" + b;
    for (var l in e) {
        var g = e[l];
        if (g.field !== h && (g.field !== m)) {
            try {
                var a = $("#" + g.field);
                if (g.type === "chk") {
                    a.prop("checked", g.val).checkboxradio("refresh")
                } else {
                    if (g.val !== "" && a.attr("name") !== undefined && a.attr("name").substring(0, 4) === "Pick") {
                        a.mobiscroll("setDate", fromDBDate(g.val), true)
                    } else {
                        if (g.type === "sel") {
                            if (g.field === ("Search" + b + "_assigned_user_name") && g.val && typeof g.val === "string") {
                                g.val = [g.val]
                            }
                            a.val(g.val).selectmenu("refresh")
                        } else {
                            a.val(g.val)
                        }
                    }
                }
            } catch (d) {
            }
        }
    }
    loadSortOrderDropdown(b, c)
}
function loadSearchValues(c, b)
{
    var a = QCRM.SavedSearches[b], d = SavedSearchDisplayType(b), e = c + "SaveAs";
    loadSearchFields(c, a.fields, a.sort_order);
    $("#HSavedN" + c).prop("checked", (d === "N")).checkboxradio("refresh");
    $("#HSavedI" + c).prop("checked", d === "I").checkboxradio("refresh");
    $("#HSavedD" + c).prop("checked", d === "D").checkboxradio("refresh");
    $("#" + e).val(a.name);
    if (Beans.QCRM_SavedSearch !== undefined) {
        $("#PUB" + c).val(a[shared_field]);
        $("#PUB" + c).slider("refresh")
    }
}
function onChangeSearch(c)
{
    var h = $("#" + c + "ES").val(), g = true, b = true, e = $("#" + c + "SSDN");
    if (h !== undefined && h !== " " && h !== "0") {
        var a = QCRM.SavedSearches, d = a[h];
        loadSearchValues(c, h);
        loadSortOrderDropdown(c, d.sort_order);
        g = !UserIsAdmin && d.assigned_user_id !== CurrentUserId;
        b = g
    }
    SavedSearchToggle(c, g);
    if (b) {
        e.hide()
    } else {
        e.show()
    }
}
function ListSavedSearch(b)
{
    var c = QCRM.SavedSearches[b], a = c.type;
    Beans[a].CurrentSearchValues = c.fields;
    Beans[a].CurrentOffset = 0;
    $("body").pagecontainer("change", "#" + a + "ListPage")
}
function getHomePageDef()
{
    var a = {
        name: QCRM.homepage.name,
        assigned_user_id: QCRM.homepage.assigned_user_id,
        id: QCRM.homepage.id,
        icons: QCRM.searchIcons.slice(),
        dashlets: QCRM.Dashlets.slice(),
        today: Pref.Today,
        hidden: Pref.Hidden.slice(),
        creates: Pref.Creates.slice()
    };
    a[shared_field] = QCRM.homepage[shared_field];
    return a
}
function SaveHomePageDef(a)
{
    var b = getHomePageDef();
    if (QCRM.saveToCRM) {
        b.saveToCRM = true
    }
    localStorage.setItem(ServerAddress + "Homepage", JSON.stringify(b));
    if (a && (Beans.QCRM_SavedSearch !== undefined) && !QCRM.OffLine) {
        Beans.QCRM_Homepage.SaveAll()
    }
}
function LoadHomePageDef()
{
    var a = localStorage.getItem(ServerAddress + "Homepage");
    if (a !== null && a != "") {
        a = jQuery.parseJSON(a);
        Pref.Today = a.today;
        QCRM.searchIcons = a.icons;
        QCRM.Dashlets = a.dashlets;
        Pref.Hidden = a.hidden;
        Pref.Creates = a.creates;
        QCRM.homepage = {name: a.name, id: a.id, assigned_user_id: a.assigned_user_id};
        QCRM.homepage[shared_field] = a[shared_field];
        if (a.saveToCRM) {
            QCRM.saveToCRM = true
        }
    } else {
        $.each(QCRM.beans, function(b, c)
        {
            if (!Beans[c].HomeIcon) {
                Pref.Hidden = Pref.Hidden.concat(c)
            }
        })
    }
}
function SaveSearchesAndHomePage(a)
{
    localStorage.setItem(ServerAddress + "SavedSearch", JSON.stringify(QCRM.SavedSearches));
    SaveHomePageDef(a)
}
function ClearSavedSearch(b, a)
{
    if (!a) {
        $("#" + b + "SaveAs").val("")
    }
    $("#" + b + "ES").val("0");
    if (Beans.QCRM_SavedSearch !== undefined) {
        $("#PUB" + b).val("0");
        $("#PUB" + b).slider("refresh")
    }
    $("#HSavedN" + b).prop("checked", true).checkboxradio("refresh");
    $("#HSavedI" + b).prop("checked", false).checkboxradio("refresh");
    $("#HSavedD" + b).prop("checked", false).checkboxradio("refresh");
    SavedSearchToggle(b)
}
function RenCurrentSavedSearch()
{
    var a = $("#RenInitModule").val(), c = $("#" + a + "ES").val(), b = $("#RenNewText").val().trim();
    if (c !== undefined && c !== " " && c !== "0") {
        if (UserIsAdmin || QCRM.SavedSearches[c].assigned_user_id === CurrentUserId) {
            if (b !== $("#RenInitText").val() && b !== "") {
                QCRM.SavedSearches[c].name = b;
                SavedSearchEnum(a, c);
                QCRM.UpdFavIcons = true;
                updateDashlets();
                StoreSavedSearch(c, false);
                SaveSearchesAndHomePage(true);
                $("#" + a + "SaveAs").val(b)
            }
        }
    }
}
function DelCurrentSavedSearch(a)
{
    var b = $("#" + a + "ES").val();
    if (b !== undefined && b !== " " && b !== "0") {
        if (UserIsAdmin || QCRM.SavedSearches[b].assigned_user_id === CurrentUserId) {
            ConfirmPopup(sugar_app_strings.NTC_DELETE_CONFIRMATION, function()
            {
                delete QCRM.SavedSearches[b];
                QCRM.DashletRemove(QCRM.Dashlets, b);
                QCRM.DashletRemove(QCRM.searchIcons, b);
                SavedSearchEnum(a, "");
                SaveSearchesAndHomePage();
                ClearSavedSearch(a);
                QCRM.UpdFavIcons = true;
                updateDashlets();
                if (Beans.QCRM_SavedSearch !== undefined) {
                    QCRM.delete_entry("QCRM_SavedSearch", b, function(c)
                    {
                    })
                }
                return
            }, "")
        }
    }
}
function DisplaySavedSearches()
{
    var e, d, c = QCRM.SavedSearches, h = $("#SavedSearchList");
    h.empty();
    for (e in QCRM.beans) {
        var g = true, b = QCRM.beans[e], a = sugar_app_list_strings.moduleList[b];
        if (Beans[b].ShowTab && Beans[b].Enabled()) {
            for (var d in c) {
                var n = c[d], m = SavedSearchDisplayType(d);
                if (n.type === b) {
                    if (g) {
                        h.append('<li data-role="list-divider">' + a + "</li>");
                        g = false
                    }
                    h.append('<li><div data-id="' + d + '" data-display="' + m + '" class="ms-line">' + n.name + "</div></li>")
                }
            }
        }
    }
}
function createDashlets()
{
    var e = true, b, a = 0, d = $("#dashletsLEFT"), l = $("#dashletsRIGHT"), c, h, g;
    d.empty();
    l.empty();
    for (a = 0; a < QCRM.maxDashlets + ((Pref.Today && QCRM.ShowToday) ? 1 : 0); a++) {
        c = e ? d : l;
        b = "dashlet" + a + "Div";
        g = $('<ul id="' + b + '" data-role="listview" data-inset="true" data-theme="c" data-filter="false" style="display:none"/>');
        h = getNavButtons(b);
        g.append("<li " + ((Pref.Today && QCRM.ShowToday && a === 0) ? 'data-type="today"' : "") + ">" + h + "</li>");
        c.append(g);
        if (a == 0 && Pref.Today && QCRM.ShowToday) {
            $("#" + b + "L").click(function(m)
            {
                QCRM.TodayDashlet.update(-1)
            });
            $("#" + b + "R").click(function(m)
            {
                QCRM.TodayDashlet.update(1)
            })
        } else {
            $("#" + b + "L").click({val: a}, function(m)
            {
                display1Dashlet(m.data.val, QCRM.dashletsDiv[m.data.val].prev_offset)
            });
            $("#" + b + "R").click({val: a}, function(m)
            {
                display1Dashlet(m.data.val, QCRM.dashletsDiv[m.data.val].next_offset)
            })
        }
        e = !e
    }
    if (Pref.Today && QCRM.ShowToday) {
        $("#dashlet0DivT").on("tap", function(m)
        {
            QCRM.TodayDashlet.handleTapHold();
            return false
        })
    }
}
function updateDashlets()
{
    function e(g, l, h)
    {
        $("#dashlet" + g + "Div").show();
        $("#dashlet" + g + "DivT").html(h);
        QCRM.dashletsDiv.push({
            index: g,
            savedsearch: l,
            current_offset: 0,
            next_offset: 0,
            result_count: 0,
            total_count: false
        })
    }

    var b, a = 0;
    QCRM.dashletsDiv = [];
    if (Pref.Today && QCRM.ShowToday) {
        e(a, -1, sugar_app_list_strings.date_search.today);
        QCRM.TodayDashlet.div = "dashlet" + a + "Div";
        a++
    } else {
    }
    for (b in QCRM.Dashlets.slice()) {
        var d = QCRM.SavedSearches[QCRM.Dashlets[b].id];
        if (d) {
            var c = d.type;
            if (Beans[c] && Beans[c].Enabled()) {
                e(a, QCRM.Dashlets[b].id, d.name);
                a++
            }
        } else {
            QCRM.DashletRemove(QCRM.SavedSearches, QCRM.Dashlets[b].id)
        }
    }
    for (a; a < QCRM.maxDashlets + ((Pref.Today && QCRM.ShowToday) ? 1 : 0); a++) {
        $("#dashlet" + a + "Div").hide()
    }
}
function display1Dashlet(c, h, a)
{
    var g = QCRM.dashletsDiv[c], b = "dashlet" + g.index + "Div";
    QCRM.dashletsDiv[c].current_offset = h;
    if (c == 0 && Pref.Today && QCRM.ShowToday) {
        if (a) {
            QCRM.TodayDashlet.display()
        }
    } else {
        if (QCRM.SavedSearches[g.savedsearch]) {
            var e = QCRM.SavedSearches[g.savedsearch], d = e.type;
            if (Beans[d] && Beans[d].Enabled()) {
                $.mobile.loading("show");
                ShowBeansList(d, "", get_where(d, e.fields), RowsPerDashlet, e.sort_order ? e.sort_order : Beans[d].OrderBy, b, "HomePage", h, function(l)
                {
                    $.mobile.loading("hide");
                    g.next_offset = l.next_offset;
                    g.result_count = l.result_count;
                    g.total_count = l.total_count;
                    g.prev_offset = h - RowsPerDashlet;
                    if (g.prev_offset < 0) {
                        g.prev_offset = 0
                    }
                    enableButton(b + "L", h !== 0);
                    enableButton(b + "R", !((g.result_count === 0) || (g.total_count && g.next_offset >= g.total_count)))
                })
            }
        }
    }
}
function displayDashlets(a)
{
    var b;
    for (b in QCRM.dashletsDiv) {
        if (b < QCRM.maxDashlets + ((Pref.Today && QCRM.ShowToday) ? 1 : 0)) {
            display1Dashlet(b, 0, a)
        }
    }
}
QCRM.DashletMember = function(b, c)
{
    var a;
    for (a in b) {
        if (b[a].id === c) {
            return true
        }
    }
    return false
};
QCRM.DashletAdd = function(a, b)
{
    a.push(b)
};
QCRM.DashletRemove = function(b, c)
{
    var a;
    for (a in b) {
        if (b[a].id === c) {
            b.splice(a, 1);
            return
        }
    }
    return
};
function Dashlet(a, d, b, c)
{
    this.name = a;
    this.id = d;
    this.div = "";
    this.type = "Search";
    this.mode = "Dashlet";
    this.navigation = (c === "Dashlet")
}
QCRM.TodayDashlet = new Dashlet(function()
{
    return (toDBDate(this.CurDate) === toDBDate(CurrentDate)) ? sugar_app_list_strings.date_search.today : jQuery.mobiscroll.formatDate(date_format, this.CurDate)
}, "Today", "Preset", "Dashlet");
QCRM.TodayDashlet.CurDate = new Date();
QCRM.TodayDashlet.handleTapHold = function()
{
    var c = $("#" + this.div + "T"), b = "#todayN", a = create_picker("date", "todayN", "", false, true);
    QCRM.IEsavedContents = c.html();
    c.empty();
    c.append(a);
    init_picker(b, "date", QCRM.TodayDashlet.CurDate, {
        onSelect: function(e, d)
        {
            QCRM.TodayDashlet.CurDate = $(b).mobiscroll("getDate");
            QCRM.TodayDashlet.display()
        }, onCancel: function(e, d)
        {
            c.html(QCRM.IEsavedContents)
        }
    });
    $(b).mobiscroll("show")
};
QCRM.TodayDashlet.display = function(m)
{
    var e = toDBDate(QCRM.TodayDashlet.CurDate), l = this.div, c = $("#" + l), a, h, g;
    $("#" + l + "T").html(this.name());
    GetCalendarMarked(QCRM.TodayDashlet.CurDate, 0, 0, function(d, b)
    {
        $("#" + l + " li:gt(0)").remove();
        if (d[e] !== undefined) {
            for (a = 0; a < d[e].elements.length; a++) {
                h = d[e].elements[a];
                g = (h.type == "native") ? getCalendarLink(h.id, h.name_value_list) : AddLinkWithIcon(h.type, h.id, "", h.name_value_list, h.phones, "HomePage", true, "");
                c.append(g)
            }
        }
        c.listview("refresh");
        if (mobile_app) {
        }
        if (m !== undefined) {
            m()
        }
    })
};
QCRM.TodayDashlet.update = function(a)
{
    if (Pref.Today && QCRM.ShowToday) {
        $.mobile.loading("show");
        if (a) {
            QCRM.TodayDashlet.CurDate.addHours(24 * a)
        }
        QCRM.TodayDashlet.display(function()
        {
            $.mobile.loading("hide")
        })
    }
};
function removeFromArray(b, c)
{
    var a = b.indexOf(c);
    if (a !== -1) {
        b.splice(a, 1)
    }
}
function StoreSavedSearch(c, b)
{
    var a = Record2NVL(QCRM.SavedSearches[c], Beans.QCRM_SavedSearch.ListFields);
    a.fields.value = btoa(JSON.stringify(a.fields.value));
    if (b) {
        a.new_with_id = {name: "new_with_id", value: "1"}
    }
    QCRM.set_entry("QCRM_SavedSearch", c, a, function(d)
    {
    })
}
function updateIconOrDashlet(c, b)
{
    var e = $("input[name='" + c + "HSavedS']:checked").val(), d = {
        id: b,
        type: "Search",
        module: c
    }, a = (Beans.QCRM_SavedSearch !== undefined) && !QCRM.OffLine;
    if (e !== "D") {
        QCRM.DashletRemove(QCRM.Dashlets, b)
    }
    if (e !== "I") {
        QCRM.DashletRemove(QCRM.searchIcons, b)
    }
    if (e === "D") {
        if (!QCRM.DashletMember(QCRM.Dashlets, b)) {
            QCRM.DashletAdd(QCRM.Dashlets, d)
        }
    }
    if (e === "I") {
        if (!QCRM.DashletMember(QCRM.searchIcons, b)) {
            QCRM.DashletAdd(QCRM.searchIcons, d)
        }
    }
    if (a) {
        Beans.QCRM_Homepage.SaveAll(false)
    }
}
function cleanUpIconAndDashlet()
{
    function a(b)
    {
        var c, d, e = [];
        for (c in b) {
            d = b[c];
            if (QCRM.SavedSearches[d.id]) {
                e.push(d)
            }
        }
        return e
    }

    QCRM.Dashlets = a(QCRM.Dashlets);
    QCRM.searchIcons = a(QCRM.searchIcons)
}
function updateSavedSearch(d, o, g)
{
    var c, b = false, a = false, p = $("#" + d + "SaveAs").val().trim().replace('"', ""), e = false, n = (Beans.QCRM_SavedSearch !== undefined);
    if (p !== "") {
        var h = QCRM.SavedSearches;
        for (var m in h) {
            var q = h[m];
            if (q.type === d && p === q.name.trim() && (q[shared_field] == "0" || q.assigned_user_id == CurrentUserId)) {
                a = m;
                break
            }
        }
        if (n) {
            e = $("#PUB" + d).val()
        }
        if (a) {
            QCRM.SavedSearches[a].fields = o;
            QCRM.SavedSearches[a].sort_order = g;
            QCRM.SavedSearches[a][shared_field] = e
        } else {
            a = QCreateId();
            b = true;
            c = toDBDateTime(new (Date));
            QCRM.SavedSearches[a] = {
                id: a,
                date_modified: c,
                date_entered: c,
                name: p,
                type: d,
                fields: o,
                sort_order: g,
                assigned_user_id: CurrentUserId
            };
            QCRM.SavedSearches[a][shared_field] = e
        }
        updateIconOrDashlet(d, a);
        SaveSearchesAndHomePage();
        QCRM.UpdFavIcons = true;
        updateDashlets();
        if (n) {
            StoreSavedSearch(a, b)
        }
    }
    return a
}
function get_where(c, E)
{
    var r = "", p = false, h = Beans[c], H = h.table, m = h.SearchFields, D = [];
    if (h.basic_search) {
        m = m.concat(h.basic_search)
    }
    if (!E) {
    } else {
        for (var G in E) {
            D[E[G].field] = {type: E[G].type, val: E[G].val}
        }
        if (true) {
            for (var K in m) {
                var I = m[K], B = sugar_mod_fields[c][I], u = "", w = "", z = ((B.source === null || B.source === undefined) ? "" : B.source), C = "Search" + c + "_" + I, e = H + z + "." + I;
                if (B === undefined) {
                    continue
                } else {
                    if (B.get_where) {
                        try {
                            if (D[C] && D[C].val) {
                                u = D[C].val
                            }
                            r += B.get_where(e, u, D)
                        } catch (o) {
                        }
                    } else {
                        try {
                            switch (B.type) {
                                case"name":
                                case"varchar":
                                case"char":
                                case"text":
                                case"phone":
                                case"readonly":
                                    u = D[C].val;
                                    if (u !== "") {
                                        r += matchString(B.searchmode, e, u)
                                    }
                                    break;
                                case"enum":
                                case"dynamicenum":
                                case"multienum":
                                    u = D[C].val;
                                    if (B.singleSelect) {
                                        u = [u]
                                    }
                                    var F, a, q = "", l = false, n = "";
                                    for (F in u) {
                                        a = u[F];
                                        if (a === "" || (B.singleSelect && a === "EMPTY")) {
                                            l = true
                                        } else {
                                            if (B.type === "enum") {
                                                q += "'" + a + "'"
                                            } else {
                                                q += "(" + e + " LIKE '%^" + a + "^%')"
                                            }
                                        }
                                    }
                                    if (l && !B.singleSelect) {
                                        n = "(" + e + " IS NULL OR " + e + "= '' OR " + e + " ='^^')"
                                    }
                                    if (q !== "") {
                                        if (B.type === "enum") {
                                            q = q.replace(/''/g, "','");
                                            q = "(" + e + " in (" + q + "))"
                                        } else {
                                            q = "(" + q.replace(/\)\(/g, ") OR (") + ")"
                                        }
                                        q = q.replace(/'EMPTY'/g, "''");
                                        if (n !== "") {
                                            r += "(" + n + " OR " + q + ")"
                                        } else {
                                            r += q
                                        }
                                    } else {
                                        r += n
                                    }
                                    break;
                                case"date":
                                case"datetime":
                                    var g = D[C + "E"].val, J = new Date(), A = new Date();
                                    if (g === "between") {
                                        u = D[C + "From"].val;
                                        w = D[C + "To"].val
                                    } else {
                                        if (g !== "=") {
                                            var s = 1900 + J.getYear();
                                            switch (g) {
                                                case"today":
                                                    break;
                                                case"yesterday":
                                                    J.setDate(J.getDate() - 1);
                                                    A.setDate(A.getDate() - 1);
                                                    break;
                                                case"tomorrow":
                                                    J.setDate(J.getDate() + 1);
                                                    A.setDate(A.getDate() + 1);
                                                    break;
                                                case"past":
                                                    J = "";
                                                    A.setDate(A.getDate() - 1);
                                                    break;
                                                case"future":
                                                    J.setDate(J.getDate() + 1);
                                                    A = "";
                                                    break;
                                                case"next_7_days":
                                                    A.setDate(J.getDate() + 7);
                                                    break;
                                                case"next_30_days":
                                                    A.setDate(J.getDate() + 30);
                                                    break;
                                                case"last_7_days":
                                                    J.setDate(J.getDate() - 7);
                                                    break;
                                                case"last_30_days":
                                                    J.setDate(J.getDate() - 30);
                                                    break;
                                                case"this_year":
                                                    J = new Date(s, 0, 1);
                                                    A = new Date(s, 11, 31);
                                                    break;
                                                case"next_year":
                                                    J = new Date(s + 1, 0, 1);
                                                    A = new Date(s + 1, 11, 31);
                                                    break;
                                                case"last_year":
                                                    J = new Date(s - 1, 0, 1);
                                                    A = new Date(s - 1, 11, 31);
                                                    break;
                                                case"this_month":
                                                    J.setDate(1);
                                                    A = new Date(s, J.getMonth() + 1, 0);
                                                    break;
                                                case"next_month":
                                                    A = new Date(s, J.getMonth() + 2, 0);
                                                    J = new Date(s, J.getMonth() + 1, 1);
                                                    break;
                                                case"last_month":
                                                    A = new Date(s, J.getMonth(), 0);
                                                    J = new Date(s, J.getMonth() - 1, 1);
                                                    break;
                                                default:
                                                    break
                                            }
                                            if (B.type === "date") {
                                                u = toDBDate(J);
                                                w = toDBDate(A)
                                            } else {
                                                if (J === "") {
                                                    u = ""
                                                } else {
                                                    J.setHours(0);
                                                    J.setMinutes(0);
                                                    u = toDBDateTime(J)
                                                }
                                                if (A === "") {
                                                    w = ""
                                                } else {
                                                    A.setHours(23);
                                                    A.setMinutes(59);
                                                    w = toDBDateTime(A)
                                                }
                                            }
                                        }
                                    }
                                    if (u !== "") {
                                        r += "(" + e + " >= '" + u + "')"
                                    }
                                    if (w !== "") {
                                        r += "(" + e + " <= '" + w + "')"
                                    }
                                    break;
                                case"currency":
                                case"int":
                                case"float":
                                case"decimal":
                                case"double":
                                    u = D[C + "From"].val;
                                    w = D[C + "To"].val;
                                    if (u !== "") {
                                        r += "(" + e + " >= " + u + ")"
                                    }
                                    if (w !== "") {
                                        r += "(" + e + " <= " + w + ")"
                                    }
                                    break;
                                case"bool":
                                case"boolean":
                                    u = D[C].val;
                                    if (u === "1") {
                                        r += "(" + e + "=1 OR " + e + "='1')"
                                    } else {
                                        if (u === "0") {
                                            r += "(" + e + "=0 OR " + e + " IS NULL)"
                                        }
                                    }
                                    break;
                                case"relate":
                                    e = H + z + "." + B.id_name;
                                    if (I === "assigned_user_name" && QCRM.multiple_assigned) {
                                        u = D[C].val;
                                        if (u) {
                                            if (typeof u === "object") {
                                                r += "(" + e + " IN ('" + u.join("','") + "'))";
                                                break
                                            }
                                        } else {
                                            break
                                        }
                                    } else {
                                        if (Beans[B.module] === undefined) {
                                            u = D[C].val
                                        } else {
                                            if (B.search === "non-db") {
                                                e = B.id_name
                                            }
                                            u = D["Search" + c + "_" + B.id_name].val
                                        }
                                    }
                                    if (u !== " " && u !== "" && u !== "EMPTY") {
                                        r += "(" + e + "='" + u + "')"
                                    }
                                    break;
                                case"email":
                                    u = D[C].val;
                                    if (u !== "") {
                                        if (QCRM.OffLine) {
                                            r += matchString(B.searchmode, e, u)
                                        } else {
                                            r += "(" + H + ".id in (SELECT eabr.bean_id FROM email_addr_bean_rel eabr JOIN email_addresses ea ON (ea.id = eabr.email_address_id) WHERE eabr.deleted=0 AND ea.email_address " + matchStringOp(B.searchmode, u) + "))"
                                        }
                                    }
                                    break;
                                case"parent":
                                    e = B.id_name;
                                    u = D["Search" + c + "_" + B.id_name].val;
                                    if (u !== " " && u !== "" && u !== "EMPTY") {
                                        r += "(" + e + "='" + u + "' and " + B.id_type + "='" + D["Search" + c + "_" + B.id_type].val + "')"
                                    }
                                    break;
                                case"custom":
                                    r += B.get_where(c, D);
                                    break;
                                default:
                                    break
                            }
                        } catch (o) {
                        }
                    }
                }
            }
            r = r.replace(/\)\(/g, ") AND (")
        }
    }
    if (D[c + "MyItems"]) {
        p = D[c + "MyItems"].val
    } else {
        if (QCRM.defaultMyItems) {
            p = localStorage.getItem(c + "MyItems") !== "0"
        } else {
            p = localStorage.getItem(c + "MyItems") === "1"
        }
    }
    if (p) {
        if (r !== "") {
            r += " and"
        }
        r += " " + h.MyItemsQuery()
    }
    if (Pref.FilterOldDate !== "" && Pref.FilterOld.indexOf(c) !== -1) {
        if (r !== "") {
            r += " and"
        }
        r += " " + H + ".date_entered > '" + Pref.FilterOldDate + "'"
    }
    return r
}
function SaveMyItems(b, a)
{
    localStorage.setItem(b + "MyItems", (a ? 1 : 0))
}
function LoadMyItems(b)
{
    var a = localStorage.getItem(b + "MyItems");
    if (a === "1") {
        $("#" + b + "MyItems").prop("checked", true).checkboxradio("refresh")
    } else {
        $("#" + b + "MyItems").prop("checked", false).checkboxradio("refresh")
    }
}
function setDefaultMyItems(a)
{
    QCRM.defaultMyItems = a;
    for (var b in QCRM.beans) {
        SaveMyItems(QCRM.beans[b], a)
    }
}
function AlertPopup(a)
{
    a = HTMLDecode(a);
    if (mobile_app && navigator.notification) {
    } else {
        alert(a)
    }
}
function ConfirmPopup(a, c, b)
{
    a = HTMLDecode(a);
    if (mobile_app && navigator.notification) {
    } else {
        if (confirm(a)) {
            c()
        }
    }
}
function getPhoneValues(h, u, d)
{
    var b = [], q = 0, p, g, o = Beans[d].PhoneFields, w = false;
    for (p in o) {
        if (h[o[p]] !== undefined && h[o[p]].value !== "") {
            if (w === false) {
                w = {module: d, id: h.id ? h.id.value : "", name: Beans[d].DisplayTitle(h), records: []}
            }
            q++;
            w.records.push({phone: h[o[p]].value, type: o[p]})
        }
    }
    if (w !== false) {
        b.push(w)
    }
    if (u && u.length > 0) {
        for (g = 0; g < u.length; g++) {
            var s = u[g], n = s.name, c = Beans[d].Links[n].module, v = d !== "Calls" && Beans[d].Links.calls === undefined;
            o = Beans[c].PhoneFields;
            for (var a = 0; a < s.records.length; a++) {
                var m = s.records[a];
                if (m && m.link_value) {
                    m = m.link_value;
                    w = false;
                    for (p in o) {
                        var e = o[p];
                        if (m[e] !== undefined && m[e].value !== "") {
                            if (q < 6) {
                                if (w === false) {
                                    w = {module: c, name: Beans[c].DisplayTitle(m), records: []};
                                    if (v) {
                                        w.id = m.id.value
                                    }
                                }
                                w.records.push({phone: m[o[p]].value, type: e})
                            }
                        }
                    }
                }
                if (w !== false) {
                    b.push(w)
                }
            }
        }
    }
    return b
}
function AjaxErr()
{
    $("body").pagecontainer("change", "#LoginPage");
    $("#LoginLoading").html("Login failed. Please check permissions on custom/QuickCRM directory")
}
function MobileInit(l)
{
    function d()
    {
        QCRM.get_available_modules(function()
        {
            var q = "#HomePage";
            if (l !== undefined) {
                q = l
            } else {
                if (init_module !== "" && init_record !== "" && Beans[init_module] !== undefined) {
                    Beans[init_module].CurrentId = init_record;
                    q = "#" + init_module + "DP";
                    init_module = "";
                    init_record = ""
                }
            }
            QCRM.Ready = true;
            AfterLogin(q, (!mobile_app))
        })
    }

    if (mobile_edition === "CE") {
        QCRM.enableBeans(["Accounts", "Contacts", "Opportunities", "Leads", "Calls", "Meetings", "Tasks", "Cases", "Project", "ProjectTask", "Notes"])
    }
    if (!((mobile_edition === "Pro") && (offline_max_days > 0) && mobile_app && (sugar_version > "6.3") && (typeof openDatabase !== "undefined"))) {
        $("#OffLineContainer").remove()
    }
    if (QCRM.OffLine) {
        localStorage.setItem("reminder" + ServerAddress, "no")
    } else {
        localStorage.setItem("reminder" + ServerAddress, "")
    }
    if (typeof QCRM.OptionsDefaults === "function") {
        QCRM.OptionsDefaults()
    }
    defaultPreferences();
    updatePreferences(true);
    init_done = true;
    if (mobile_app) {
    }
    try {
        var m = $.mobile.urlHistory.stack[0];
        if (m.hash === "#HomePage" || m.pageUrl === "HomePage") {
            $("#HomePage").trigger("pagebeforecreate");
            var c = $("#HomeBar").html();
            $("#HomeBar").remove();
            $("#HomeHeader").append('<div id="HomeBar" data-role="navbar" data-mini="true" >' + c + "<div>");
            $("#HomeBar").navbar();
            $("body").pagecontainer("change", "#LoginPage");
            $("#AllModulesPopupDiv").listview("refresh")
        }
    } catch (e) {
    }
    var b = new Date();
    if (!b.isDST()) {
        TimeZoneOffset++
    }
    var o = Quser_name, a = Qpwd, n = '<div class="CenterBtns"><a id="LoginButton" href="javascript:LoginUser();" data-role="button" data-mini="true" data-inline="true" style="color:#FFF;text-decoration:none;">' + RES_LOGIN_TITLE + "</a></div>", h;
    h = GetLanguage();
    try {
        QCRM.calendar.firstDay = (h === "en") ? 0 : jQuery.mobiscroll.i18n[h].firstDay
    } catch (e) {
        QCRM.calendar.firstDay = 0
    }
    if (QCRM.OffLine) {
    } else {
        if (mobile_app && !ForceLogin && o !== null && o !== "" && a !== null && a !== "") {
        } else {
            if (!mobile_app) {
                $("#LoginForm").append(n);
                InitLoginPage();
                $("#LoginButton").button();
                $("#LoginLoading").hide();
                $("#LoginForm").show()
            }
        }
    }
    if (typeof QuickCRMInit === "function") {
        QuickCRMInit()
    }
    for (var g in QCRM.hooks.init) {
        QCRM.hooks.init[g]()
    }
    if (QCRM.webdb) {
        t = getCookie("OffLineNb");
        if (t === null || t === "") {
            Pref.OffLineNb = QCRM.webdb.MaxRecords
        }
    }
}
$(document).on("pageinit", "#HomePage", function()
{
    $.event.special.swipe.horizontalDistanceThreshold = 60;
    $.event.special.swipe.verticalDistanceThreshold = 40;
    $("#HomeTop").on("swiperight swipeleft", function(a)
    {
        if ($("body").pagecontainer("getActivePage").jqmData("panel") !== "open") {
            if (a.type === "swiperight") {
                $("#HomePanel").panel("open")
            }
        } else {
            if (a.type === "swipeleft") {
                $("#HomePanel").panel("close")
            }
        }
    })
});
$("#HomePage").on("pagebeforecreate", function()
{
    var a = QCRM.beans;
    AddPhonePopup("HomePage");
    if (mobile_edition === "CE") {
        $("#AboutPro").show()
    }
    if (!init_done) {
        MobileInit()
    }
    $.mobile.page.prototype.options.backBtnTheme = "a";
    $("#HomePageTitle").text(QAppName);
    if (typeof HomePageInit === "function") {
        HomePageInit()
    }
    if (!mobile_app) {
    } else {
    }
    $("#NotifyClear").text(RES_CLEAR);
    if (IconsLabels) {
        $("#AdminPageLinkLabel").text(RES_OPTIONS);
        $("#CalendarLinkLabel").text(RES_CALENDAR);
        $("#AllModulesLinkLabel").text(RES_ALLMODULES);
        $("#LastViewedLinkLabel").text(sugar_app_strings.LBL_LAST_VIEWED);
        $("#MapsLinkLabel").text(RES_MAPS_TITLE)
    }
    $("#LastViewedPanelDiv li").remove();
    GetBeansList(LastViewed, "LastViewedPanelDiv", true, sugar_app_strings.LBL_LAST_VIEWED, false, true);
    UpdateFavoritesPanel(false);
    $("#PanelSearchText").attr("placeholder", RES_SEARCH_LABEL);
    GetAllModulesList("AllModulesPopupDiv");
    $("#AllModulesPopupDiv").listview("refresh");
    if (!QCRM.JJWG) {
        $("#MapsContainer").remove()
    }
    if (!Beans.Meetings.Enabled() && !Beans.Calls.Enabled()) {
        $("#CalendarContainer").remove();
        QCRM.ShowToday = false
    }
});
QCRM.handleOpenURL = function()
{
    var a = sessionStorage.getItem("OpenURL");
    return false
};
function HomepageRefresh(o)
{
    var g = true, n = '<div class="IconContainer" style="padding:5px;">', q = '<div class="TextContainer" style="padding:5px;">', c = '<div class="ui-body-c" style="background:#ddd !important;color:#222;text-shadow:none;padding:3px;min-height:38px;">', b = $("#Favorites"), m = QCRM.searchIcons.slice();
    if (mobile_app && mobile_edition === "Pro" && sugar_version > "6.3" && QCRM.webdb && typeof openDatabase !== "undefined") {
    }
    if (QCRM.UpdButtons) {
        var h = $("#Creates");
        h.empty();
        $.each(QCRM.beans, function(r, s)
        {
            if (Beans[s].Enabled() && Pref.Hidden.indexOf(s) === -1 && Beans[s].ShowTab && (!QCRM.OffLine || Pref.SyncModules[s].sync !== "None")) {
                $("#Icon" + s).show()
            } else {
                $("#Icon" + s).hide()
            }
            if (Pref.Creates.indexOf(s) !== -1 && Beans[s].Enabled()) {
                var v = $(n + "</div>");
                var u = $(c + '<a href="#" class="ui-link">' + sugar_mod_strings[s].NEW + "</a></div>");
                u.click({mod: s}, function(d)
                {
                    Beans[d.data.mod].Create()
                });
                v.append(u);
                h.append(v);
                g = false
            }
        });
        h.css({"padding-bottom": (g ? "0" : "10") + "px"})
    }
    if (mobile_edition === "Pro") {
        if (QCRM.UpdFavIcons) {
            b.empty();
            g = true;
            for (var e in m) {
                var p = QCRM.SavedSearches[m[e].id];
                if (p && Beans[p.type] !== undefined && Beans[p.type].Enabled()) {
                    var l = $(q + "</div>"), a = $(c + '<a href="#" class="ui-link">' + p.name + "</a></div>");
                    a.click({ind: m[e].id}, function(s)
                    {
                        var r = QCRM.SavedSearches[s.data.ind], d = r.type;
                        Beans[d].CurrentSearchValues = r.fields;
                        Beans[d].CurrentSearchOrder = r.sort_order ? r.sort_order : "";
                        $("body").pagecontainer("change", "#" + d + "ListPage")
                    });
                    l.append(a);
                    b.append(l);
                    g = false
                }
            }
            b.css({"padding-bottom": (g ? "0" : "10") + "px"});
            QCRM.UpdFavIcons = false
        }
        displayDashlets(o);
        enableButton("SettingsIcon", !QCRM.OffLine);
        if ((offline_max_days > 0) && mobile_app && (sugar_version > "6.3") && (typeof openDatabase !== "undefined")) {
        }
    }
    RequestPassword();
    QCRM.UpdButtons = false
}
$("#HomePage").on("pageshow", function(c, b)
{
    QCRM.History.push("#HomePage");
    if (!init_done) {
        MobileInit()
    }
    home_created = true;
    if (SugarSessionId === "" && !QCRM.OffLine) {
        $("body").pagecontainer("change", "#LoginPage")
    }
    try {
        HomepageRefresh(true)
    } catch (a) {
        $("#HomeWarning").html("Unexpected Error")
    }
    try {
        if (!iOS && mobile_app && typeof b.prevPage[0] !== "undefined" && b.prevPage[0].id == "LoginPage") {
        }
    } catch (a) {
    }
});
function checkForceLock()
{
    return !QCRM.forceLock || Pref.AppLock
}
function PasswordEntered()
{
    if ($("#EnterPassword").val() === Pref.AppLock) {
        unlocked = true;
        localStorage.setItem("WrongPwd", 0)
    } else {
        $("#PwdErr").text(RES_WRONG_PWD);
        var a = parseInt(localStorage.getItem("WrongPwd", 0), 10) + 1;
        if (a > 4) {
            if (QCRM.OffLine) {
            }
            AlertPopup("All data have been erased and your password has been removed from settings");
            localStorage.setItem("Spassword", "");
            localStorage.removeItem("AppLock");
            localStorage.setItem("WrongPwd", 0);
            AppReload()
        } else {
            localStorage.setItem("WrongPwd", a)
        }
    }
}
function RequestPassword()
{
    if (Pref && (Pref.AppLock !== false) && !unlocked) {
        setTimeout('$("#lnkPwd").click();', 150)
    }
}
function SaveLockPage()
{
    if (Pref.AppLock === false) {
        var a = $("#DefPassword").val();
        if (a !== "") {
            if (a === $("#DefPassword2").val()) {
                localStorage.setItem("AppLock", a);
                localStorage.setItem("WrongPwd", 0);
                Pref.AppLock = a;
                $("#LockPageCancelBtn").click()
            } else {
                $("#LockErr").text(RES_PWD_MISMATCH)
            }
        }
    } else {
        if ($("#RemoveLock").val() === Pref.AppLock) {
            localStorage.removeItem("AppLock");
            Pref.AppLock = false;
            $("#LockPageCancelBtn").click()
        } else {
            $("#LockErr").text(RES_WRONG_PWD)
        }
    }
}
$("#EnterPwdPage").on("pagebeforecreate", function()
{
    $("#EnterPasswordLabel").html(RES_ENTER_LOCK);
    $("#EnterPwdConfirmBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL)
});
$("#EnterPwdPage").on("pageshow", function()
{
    $("#EnterPassword").val("");
    $("#PwdErr").text("")
});
function DisplayLockState()
{
    if (Pref.AppLock !== false) {
        $("#AppLocked").show();
        $("#AppUnlocked").hide()
    } else {
        $("#AppLocked").hide();
        $("#AppUnlocked").show()
    }
}
$("#LockPage").on("pagebeforecreate", function()
{
    $("#LockPageTitle").text(RES_TITLE_LOCK);
    $("#AppDefLockTitle").text(RES_DEF_LOCK);
    $("#AppUnlockTitle").text(RES_UNLOCK);
    $("#DefPasswordLabel").html(RES_ENTER_LOCK);
    $("#DefPassword2Label").html(RES_ENTER2_LOCK);
    $("#RemoveLockLabel").html(RES_ENTER_LOCK);
    $("#LockPageConfirmBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL);
    $("#LockPageCancelBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL)
});
$("#LockPage").on("pageshow", function()
{
    DisplayLockState();
    $("#DefPassword").val("");
    $("#DefPassword2").val("");
    $("#RemoveLock").val("");
    $("#LockErr").text("")
});
function OptionsBackBtn(a)
{
    $("#" + a + " .OptionsBackBtn").each(function(c, b)
    {
        var d = $(this);
        if (iOS) {
            d.attr("data-icon", "arrow-l");
            d.attr("data-iconpos", "notext");
            d.attr("data-iconshadow", "false");
            d.addClass("ui-nodisc-icon");
            d.addClass("ui-alt-icon")
        } else {
            d.html(sugar_app_strings.LBL_SAVE_BUTTON_LABEL)
        }
    })
}
$("#AllOptions").on("pagebeforecreate", function()
{
    var c = ((mobile_edition === "Pro" && !GetDemo()) ? ((QTrial === "") ? (" P" + QProKey) : (" T" + QTrial)) : ""), a = (mobile_app ? app_version : ("web app " + mobile_version)), b = (mobile_edition !== "Pro");
    if (typeof GetDemo === "function") {
        if (GetDemo() && !iOS) {
            b = true
        }
    }
    if (mobile_app && !iOS && window.plugins && window.plugins.calendar) {
    }
    $("#AllOptionsTitle").text(RES_OPTIONS);
    $("#OptionsGeneralLnk").text(RES_OPT_GENERAL);
    $("#OptionsHomeLnk").text(RES_HOME_LABEL);
    $("#OptionsSortOrderLnk").text(RES_SORTORDER);
    if (mobile_edition === "Pro") {
        $("#OptionsFilterOldLnk").text(RES_FILTEROLD);
        $("#OptionsActLnk").text(RES_OPT_CALL_MEET)
    } else {
        $("#OptActDiv").remove();
        $("#OptFilterOldDiv").remove()
    }
    $("#OptSSDiv").remove();
    if (b) {
        $("#OptGetProLnk").text(RES_UNAVAILABLE);
        $("#OptGetProLnk").click({url: "http://www.quickcrm.fr/mobile" + (GetLanguage().substr(0, 2) === "fr" ? "/fr" : "")}, function(d)
        {
            d.preventDefault();
            window.open(d.data.url, "_system")
        })
    } else {
        $("#OptGetPro").remove()
    }
    $("#ContactNSTEAMContainer").html('<a href="mailto:support@quickcrm.fr?subject=Support Request from ' + a + c + '">support@quickcrm.fr</a>');
    if ((offline_max_days > 0) && mobile_app && (sugar_version > "6.3") && (typeof openDatabase !== "undefined") && !QCRM.OffLine && navigator.onLine) {
    } else {
        $("#OptSyncDiv").remove()
    }
});
$("#OptionsGeneral").on("pagebeforecreate", function()
{
    var a, b, c = {};
    OptionsBackBtn("OptionsGeneral");
    $("#OptionsGeneralTitle").text(RES_OPT_GENERAL);
    $('label[for="OptRowsPerPage"]').text(RES_ROWS_PER_PAGE);
    $('label[for="OptRowsPerSubpanel"]').text(RES_ROWS_PER_SUBPANEL);
    if (mobile_edition === "Pro") {
        $('label[for="OptRowsPerDashlet"]').text(RES_ROWS_PER_DASHLET)
    } else {
        $("#RowsPerDashlet").hide()
    }
    $("#OptSearchLbl").text(RES_SEARCH_LABEL);
    $('label[for="OptPartialSearch"]').text(RES_PARTIAL_SEARCH);
    if (mobile_app) {
        $("#OptNativeCalLbl").text(RES_CALENDAR)
    }
    if (mobile_app && iOS) {
        $('label[for="OptNativeCal"]').text(RES_NATIVE_CAL)
    }
    $("#OptToolbarLbl").text(RES_TOOLBAR);
    $('label[for="OptIconsLabels"]').text(RES_SHOWLABELS);
    $("#OptAlertsLbl").text(RES_ALERTS);
    $('label[for="OptAlerts"]').text(RES_UPDATED);
    $("#OptHideEmptySubPLbl").text(RES_SUBPANELS);
    $('label[for="OptHideEmptySubP"]').text(RES_HIDEEMPTY);
    if (!mobile_app && mobile_edition !== "Pro") {
        $("#OptAlertDiv").hide()
    }
});
$("#OptionsGeneral").on("pageshow", function()
{
    $("#OptRowsPerPage").val(RowsPerPage).slider("refresh");
    $("#OptRowsPerSubpanel").val(RowsPerSubPanel).slider("refresh");
    if (mobile_edition === "Pro") {
        $("#OptRowsPerDashlet").val(RowsPerDashlet).slider("refresh")
    }
    $("#OptIconsLabels").prop("checked", tmpIconsLabels).checkboxradio("refresh");
    if (mobile_app) {
    }
    $("#OptPartialSearch").prop("checked", Pref.PartialSearch).checkboxradio("refresh");
    if (mobile_edition === "Pro" || mobile_app) {
        $("#OptAlerts").prop("checked", Pref.Alerts).checkboxradio("refresh")
    }
    $("#OptHideEmptySubP").prop("checked", Pref.HideEmptySubP).checkboxradio("refresh")
});
function OptionsGeneralSave()
{
    var a = false, b;
    RowsPerPage = $("#OptRowsPerPage").val();
    RowsPerSubPanel = $("#OptRowsPerSubpanel").val();
    RowsPerDashlet = $("#OptRowsPerDashlet").val();
    if ((mobile_edition === "Pro" || mobile_app) && !QCRM.OffLine && c != Pref.Alerts) {
        var c = Pref.Alerts;
        Pref.Alerts = $("#OptAlerts").is(":checked");
        if (c != Pref.Alerts) {
            if (Pref.Alerts) {
                CronAlerts()
            } else {
                StopAlerts()
            }
        }
    }
    Pref.HideEmptySubP = $("#OptHideEmptySubP").is(":checked");
    Pref.PartialSearch = $("#OptPartialSearch").is(":checked");
    if (IconsLabels !== $("#OptIconsLabels").is(":checked")) {
        a = true;
        tmpIconsLabels = $("#OptIconsLabels").is(":checked")
    }
    updatePreferences(false);
    setCookie("OptRowsPerPage", RowsPerPage, 365);
    setCookie("OptRowsPerSubpanel", RowsPerSubPanel, 365);
    if (mobile_edition === "Pro") {
        setCookie("OptRowsPerDashlet", RowsPerDashlet, 365)
    }
    setCookie("OptIconsLabels", ($("#OptIconsLabels").is(":checked") ? 1 : 0), 365);
    localStorage.setItem("Alerts", (Pref.Alerts ? "1" : "0"));
    localStorage.setItem("PartialSearch", (Pref.PartialSearch ? "1" : "0"));
    localStorage.setItem("HideEmptySubP", (Pref.HideEmptySubP ? "1" : "0"));
    if (a) {
        ConfirmPopup(RES_AVAILABLE_NEXT_LOGIN, function()
        {
            LogOutUser()
        }, "")
    }
    return true
}
$("#OptionsHome").on("pagebeforecreate", function()
{
    OptionsBackBtn("OptionsHome");
    var g = $("#OptHomeIcons");
    $("#OptionsHomeTitle").text(RES_HOME_LABEL);
    if (mobile_edition == "Pro") {
        $('label[for="OptToday"]').html(sugar_app_list_strings.date_search.today)
    } else {
        $("#TodayDiv").remove()
    }
    $("#HPBtns").remove();
    for (var e in QCRM.beans) {
        var d = QCRM.beans[e], c = sugar_app_list_strings.moduleList[d];
        if (Beans[d].ShowTab && Beans[d].Enabled()) {
            if (mobile_edition == "Pro") {
                var b = $('<div class="ui-field-contain"/>'), a = $('<div data-role="controlgroup" data-type="horizontal" data-mini="true"/>');
                a.append("<legend>" + c + '</legend><input type="checkbox" name="Home' + d + '" id="Home' + d + '" data-theme="c" checked="checked"><label for="Home' + d + '">' + RES_ICON + '</label><input type="checkbox" name="Create' + d + '" id="Create' + d + '" data-theme="c"><label for="Create' + d + '">' + sugar_app_strings.LBL_CREATE_BUTTON_LABEL + "</label>");
                b.append(a);
                g.append(b)
            } else {
                g.append('<input type="checkbox" name="Home' + d + '" id="Home' + d + '" data-theme="c" checked="checked"><label for="Home' + d + '">' + c + "</label>")
            }
        }
    }
});
function refreshOptionsHome()
{
    $("#OptToday").prop("checked", Pref.Today).checkboxradio("refresh");
    for (var a in QCRM.beans) {
        var b = QCRM.beans[a];
        if (Beans[b].ShowTab && Beans[b].Enabled()) {
            $("#Home" + b).prop("checked", (Pref.Hidden.indexOf(b) === -1) && Beans[b].HomeIcon).checkboxradio("refresh");
            if (mobile_edition === "Pro") {
                $("#Create" + b).prop("checked", (Pref.Creates.indexOf(b) !== -1)).checkboxradio("refresh")
            }
        }
    }
}
$("#OptionsHome").on("pageshow", refreshOptionsHome);
function OptionsHomeSave()
{
    var l, m = "", g = [], b = "", h = [];
    QCRM.UpdButtons = true;
    if (mobile_edition == "Pro") {
        l = Pref.Today;
        Pref.Today = $("#OptToday").is(":checked");
        if (l !== Pref.Today) {
            updateDashlets()
        }
        setCookie("OptToday", (Pref.Today ? 1 : 0), 365)
    }
    for (var c in QCRM.beans) {
        var a = QCRM.beans[c], e = false, d = false;
        if (Beans[a].ShowTab) {
            if (Beans[a].Enabled()) {
                if (!$("#Home" + a).is(":checked")) {
                    e = true
                }
                if ($("#Create" + a).is(":checked")) {
                    d = true
                }
            } else {
                if (Pref.Hidden.indexOf(a) !== -1) {
                    e = true
                }
                if (Pref.Creates.indexOf(a) !== -1) {
                    d = true
                }
            }
            if (e) {
                g = g.concat(a);
                m += (m === "" ? "" : ",") + a
            } else {
                Beans[a].HomeIcon = true
            }
            if (d) {
                h = h.concat(a);
                b += (b === "" ? "" : ",") + a
            }
        }
    }
    Pref.Hidden = g;
    Pref.Creates = h;
    updatePreferences(false);
    SaveHomePageDef(true);
    return true
}
$("#OptionsSavedSearch").on("pagebeforecreate", function()
{
    OptionsBackBtn("OptionsSavedSearch");
    $("#OptionsSavedSearchTitle").text(RES_SAVEDSEARCH)
});
$("#OptionsSavedSearch").on("pageshow", function()
{
    DisplaySavedSearches()
});
function OptionsSavedSearchSave()
{
}
function createSortOrderDropdown(d, r, c)
{
    var e = "", s = true, u = Beans[c].OrderBy, v = "asc", h = "desc";
    if (typeof RES_ASC !== "undefined") {
        v = RES_ASC;
        h = RES_DESC
    }
    if (u !== "") {
        u = u.split(" ");
        e = u[0];
        if (u.length > 1) {
            s = u[1] === "asc"
        }
    }
    var p = $("<div class='ui-field-contain'/>"), o = $("<div data-role='controlgroup' data-type='horizontal'/>");
    o.append("<legend>" + r + "</legend>");
    var b = $("<select name='" + d + "field' id='" + d + "field' data-mini='true' data-theme='c'/>"), n = [""].concat(Array_unique(Beans[c].AllOrderFields().concat(["date_entered", "date_modified"]))), w = "";
    for (var a in n) {
        var q = n[a], m = display_label(c, q);
        m = (m === "" ? "&nbsp;" : m);
        w += "<option value='" + (q === "" ? "EMPTY" : q) + "'" + (q === e ? " selected='selected'" : "") + ">" + m + "</option>"
    }
    b.append(w);
    o.append(b);
    b = $("<select name='" + d + "order' id='" + d + "order' data-mini='true' data-theme='c'/>");
    b.append("<option value='asc'" + (s ? " selected='selected'" : "") + ">" + v + "</option><option value='desc'" + (!s ? " selected='selected'" : "") + ">" + h + "</option>");
    o.append(b);
    p.append(o);
    return p
}
function readSortOrderDropdown(a, b)
{
    var c = $("#" + a + "field").val();
    return ((c === "" || c === "EMPTY" || c === undefined) ? "" : (c + " " + $("#" + a + "order").val()))
}
function loadSortOrderDropdown(d, b)
{
    var c, g, e = "asc", a = "SOrder" + d;
    if (b && b !== "") {
        c = b.split(" ");
        g = c[0];
        if (c.length > 1) {
            e = c[1]
        }
    } else {
        g = "EMPTY"
    }
    if (g == "") {
        g = "EMPTY"
    }
    set_enum_val("#" + a + "field", g);
    set_enum_val("#" + a + "order", e)
}
$("#OptionsSortOrder").on("pagebeforecreate", function()
{
    OptionsBackBtn("OptionsSortOrder");
    $("#OptionsSortOrderTitle").text(RES_SORTORDER);
    var a = $("#ModulesListSort");
    for (var c in SearchPages) {
        var b = SearchPages[c];
        if (Beans[b].Enabled()) {
            var e = $("<li/>");
            a.append(e.append(createSortOrderDropdown("Order" + b, sugar_app_list_strings.moduleList[b], b)))
        }
    }
});
$("#OptionsSortOrder").on("pageshow", function()
{
});
function OptionsSortOrderSave()
{
    var c = "";
    for (var b in SearchPages) {
        var a = SearchPages[b];
        if (!Beans[a].Enabled()) {
            continue
        }
        var d = readSortOrderDropdown("Order" + a, a);
        Beans[a].OrderBy = d;
        c += (c === "" ? "{" : ",") + '"' + a + '":"' + d + '"'
    }
    c += (c === "" ? "" : "}");
    setCookie("SortOrder", c, 365);
    return true
}
$("#OptionsFilterOld").on("pagebeforecreate", function()
{
    OptionsBackBtn("OptionsFilterOld");
    $("#OptionsFilterOldTitle").text(RES_FILTEROLD);
    $("#FilterOldDiv").append(create_picker("date", "OptOldDate", RES_MINDATE, false, true));
    var b = $("#ModulesListOld");
    for (var d in QCRM.beans) {
        var c = QCRM.beans[d], a = sugar_app_list_strings.moduleList[c];
        if (Beans[c].Enabled()) {
            b.append('<input type="checkbox" name="Old' + c + '" id="Old' + c + '" data-theme="c"><label for="Old' + c + '">' + a + "</label>")
        }
    }
});
$("#OptionsFilterOld").on("pageshow", function()
{
    var c = Pref.FilterOldDate;
    init_picker("#OptOldDate", "date", (!c || c === "") ? false : fromDBDate(c));
    for (var a in QCRM.beans) {
        var b = QCRM.beans[a];
        if (Beans[b].Enabled()) {
            $("#Old" + b).prop("checked", (Pref.FilterOld.indexOf(b) !== -1)).checkboxradio("refresh")
        }
    }
});
function OptionsFilterOldSave()
{
    var e = $("#OptOldDate");
    var c = e.mobiscroll("getDate");
    if (c === null || e.val() === "") {
        Pref.FilterOldDate = ""
    } else {
        Pref.FilterOldDate = toDBDate(c)
    }
    var d = "";
    Pref.FilterOld = [];
    for (var b in QCRM.beans) {
        var a = QCRM.beans[b];
        if ($("#Old" + a).is(":checked")) {
            Pref.FilterOld = Pref.FilterOld.concat(a);
            d += (d === "" ? "" : ",") + a
        }
    }
    localStorage.setItem("FilterOldDate", Pref.FilterOldDate);
    localStorage.setItem("FilterOld", d);
    return true
}
$("#OptionsAct").on("pagebeforecreate", function()
{
    OptionsBackBtn("OptionsAct");
    $("#OptionsActTitle").text(RES_OPT_CALL_MEET);
    $('label[for="OptLogCalls"]').text(RES_LOG_CALLS);
    $("#OptLogCallsLbl").text(sugar_app_list_strings.moduleList.Calls);
    $('label[for="OptActMyItems"]').text(sugar_app_strings.LBL_CURRENT_USER_FILTER);
    $("#OptActMyItemsLbl").text(sugar_app_strings.LBL_ASSIGNED_TO);
    $('label[for="ActivitiesFrom"]').text(RES_OPT_FROM);
    $('label[for="ActivitiesTo"]').text(RES_OPT_TO);
    $("#OptActStatusLbl").text(sugar_mod_strings.Meetings ? sugar_mod_strings.Meetings.LBL_STATUS : (sugar_mod_strings.Calls ? sugar_mod_strings.Calls.LBL_STATUS : "Status"));
    var a = sugar_app_list_strings.meeting_status_dom ? sugar_app_list_strings.meeting_status_dom : {
        Planned: "Planned",
        Held: "Held",
        "Not Held": "Not Held"
    };
    $('label[for="ActStatus_planned"]').text(a.Planned);
    $('label[for="ActStatus_held"]').text(a.Held);
    $('label[for="ActStatus_not_held"]').text(a["Not Held"])
});
$("#OptionsAct").on("pageshow", function()
{
    $("#ActivitiesTo").val(Pref.ActivitiesTo).slider("refresh");
    $("#ActivitiesFrom").val(Pref.ActivitiesFrom).slider("refresh");
    $("#OptActMyItems").prop("checked", Pref.ActivitiesMine).checkboxradio("refresh");
    $("#OptLogCalls").prop("checked", Pref.LogCalls).checkboxradio("refresh");
    $("#ActStatus_planned").prop("checked", Pref.Activities_planned).checkboxradio("refresh");
    $("#ActStatus_held").prop("checked", Pref.Activities_held).checkboxradio("refresh");
    $("#ActStatus_not_held").prop("checked", Pref.Activities_not_held).checkboxradio("refresh")
});
function OptionsActSave()
{
    Pref.ActivitiesTo = $("#ActivitiesTo").val();
    Pref.ActivitiesFrom = $("#ActivitiesFrom").val();
    Pref.ActivitiesMine = $("#OptActMyItems").is(":checked");
    Pref.Activities_planned = $("#ActStatus_planned").is(":checked");
    Pref.Activities_held = $("#ActStatus_held").is(":checked");
    Pref.Activities_not_held = $("#ActStatus_not_held").is(":checked");
    Pref.LogCalls = $("#OptLogCalls").is(":checked");
    updatePreferences(false);
    setCookie("ActivitiesTo", Pref.ActivitiesTo, 365);
    setCookie("ActivitiesFrom", Pref.ActivitiesFrom, 365);
    setCookie("OptLogCalls", (Pref.LogCalls ? 1 : 0), 365);
    setCookie("OptActMyItems", (Pref.ActivitiesMine ? 1 : 0), 365);
    setCookie("ActStatus_planned", (Pref.Activities_planned ? 1 : 0), 365);
    setCookie("ActStatus_held", (Pref.Activities_held ? 1 : 0), 365);
    setCookie("ActStatus_not_held", (Pref.Activities_not_held ? 1 : 0), 365);
    return true
}
$("#OptionsSync").on("pagebeforecreate", function()
{
    var c, a, m = sugar_app_strings.LBL_LISTVIEW_ALL, h = RES_MY_ITEMS.replace(":", ""), o, l = $("#OffLineModules"), d = $("#OffLineUsers");
    OptionsBackBtn("OptionsSync");
    $("#OptionsSyncTitle").text(RES_SYNC);
    $('label[for="OffLineNb"]').text("Max.");
    if (m === undefined) {
        m = "All"
    }
    o = {
        None: RES_NONE,
        Rel: RES_RELATED,
        MineOnly: h,
        Mine: (h + " + " + RES_RELATED),
        List: sugar_app_list_strings.moduleList.Users,
        All: m
    };
    for (c in QCRM.beans) {
        a = QCRM.beans[c];
        if (Beans[a].access === "none" || Pref.SyncModules[a].preset) {
            continue
        }
        if (Pref.SyncModules[a].sync === "all") {
            Pref.SyncModules[a].sync = "All"
        }
        var e = $('<div class="ui-field-contain"/>'), g = $('<div data-role="controlgroup" data-type="horizontal" data-mini="true"/>'), b = (Pref.SyncModules[a] === undefined ? "Mine" : Pref.SyncModules[a].sync), n = ((Pref.SyncModules[a] === undefined) || Pref.SyncModules[a].max) ? ' checked="checked" ' : "";
        g.append("<legend>" + sugar_app_list_strings.moduleList[a] + "</legend>" + create_select("SyncOpt" + a, o, b, false, false) + '<input type="checkbox" id="Max' + a + '" ' + n + ' data-theme="c"><label for="Max' + a + '">Lim.</label>');
        e.append(g);
        l.append(e)
    }
    d.append('<label for="SyncList">' + sugar_app_list_strings.moduleList.Users + "</label>" + create_select("SyncList", SimpleBeans.Users.List, CurrentUserId, true, true));
    $("#SyncList").val(Pref.SyncModules.UsersList);
    $("#OffLineNb").val(Pref.OffLineNb)
});
$("#OptionsSync").on("pageshow", function()
{
    $("#OffLineNb").val(Pref.OffLineNb).slider("refresh")
});
function SyncUsersUpdate()
{
    var b, c = [], a;
    for (b in Pref.SyncModules.UsersList) {
        a = Pref.SyncModules.UsersList[b];
        if (SimpleBeans.Users.List[a] !== undefined) {
            c.push(a)
        }
    }
    if (c.length > 0) {
        Pref.SyncModules.UsersList = c
    } else {
        Pref.SyncModules.UsersList = [CurrentUserId]
    }
}
function OptionsSyncSave()
{
    if (!QCRM.OffLine) {
        for (var b in QCRM.beans) {
            var a = QCRM.beans[b];
            if (Pref.SyncModules[a] === undefined) {
                Pref.SyncModules[a] = {}
            }
            if (Pref.SyncModules[a].preset) {
                continue
            }
            Pref.SyncModules[a].max = $("#Max" + a).is(":checked");
            Pref.SyncModules[a].sync = $("#SyncOpt" + a).val()
        }
        if (Pref.SyncModules.Documents && Pref.SyncModules.Documents.sync !== "None") {
            Pref.SyncModules.Documents.attachments = true
        }
        Pref.SyncModules.UsersList = $("#SyncList").val();
        localStorage.setItem("SyncModules" + ServerAddress, JSON.stringify(Pref.SyncModules));
        Pref.OffLineNb = $("#OffLineNb").val();
        localStorage.setItem("OffLineNb", Pref.OffLineNb)
    }
    return true
}
function GetActivitiesList(g)
{
    $.mobile.loading("show");
    ActivitiesCurrentOffset = g;
    var b = new Array(), e = $("#CalendarSubMenu input:radio:checked").val(), c, h, d, a;
    if (e === "missed") {
        h = toDBDate(CurrentDate);
        c = 0
    } else {
        if (e === "today") {
            c = toDBDate(CurrentDate);
            h = toDBDate(new Date(CurrentDate.getTime() + 86400000))
        } else {
            if (e === "7days") {
                c = toDBDate(CurrentDate);
                h = toDBDate(new Date(CurrentDate.getTime() + 8 * 86400000))
            } else {
                if (e === "30days") {
                    c = toDBDate(CurrentDate);
                    h = toDBDate(new Date(CurrentDate.getTime() + 31 * 86400000))
                }
            }
        }
    }
    d = "(meetings.assigned_user_id = '" + CurrentUserId + "') AND (meetings.status='Planned') AND (meetings.date_start < '" + h + "')";
    if (c !== 0) {
        d += " AND (meetings.date_start >= '" + c + "')"
    }
    a = d.replace(/meetings/g, "calls");
    QCRM.get_entry_list("Meetings", d, Beans.Meetings.ListFieldsToSelect(), Beans.Meetings.link_phone_fields, g, 100, "date_start desc", function(p)
    {
        if (p != undefined) {
            $("#AllActivitiesListDiv li").remove();
            if (p != undefined && p.entry_list != undefined && Beans.Meetings.Enabled()) {
                var m, l = p.entry_list.length;
                for (m = 0; m < l; m++) {
                    var o = p.entry_list[m], n = {};
                    n.name_value_list = o.name_value_list;
                    n.type = "Meetings";
                    n.id = o.id;
                    if (p.relationship_list && p.relationship_list[m] && p.relationship_list[m].link_list) {
                        n.phones = p.relationship_list[m].link_list
                    } else {
                        n.phones = []
                    }
                    b.push(n)
                }
            }
            QCRM.get_entry_list("Calls", a, Beans.Calls.ListFieldsToSelect(), Beans.Calls.link_phone_fields, g, 100, "date_start desc", function(u)
            {
                if (u != undefined) {
                    if (u != undefined && u.entry_list != undefined && Beans.Calls.Enabled()) {
                        var s = 0, q = u.entry_list.length;
                        for (s = 0; s < q; s++) {
                            var r = u.entry_list[s], w = {};
                            w.name_value_list = r.name_value_list;
                            w.type = "Calls";
                            w.id = r.id;
                            if (u.relationship_list && u.relationship_list[s] && u.relationship_list[s].link_list) {
                                w.phones = u.relationship_list[s].link_list
                            } else {
                                w.phones = []
                            }
                            b.push(w)
                        }
                    }
                    b.sort(function(B, A)
                    {
                        return (B.name_value_list.date_start.value > A.name_value_list.date_start.value) ? 1 : -1
                    });
                    for (m = 0; m < b.length; m++) {
                        var z = b[m];
                        var v = AddLinkWithIcon(z.type, z.id, "", z.name_value_list, z.phones, "CalendarListPage", true, "");
                        $("#AllActivitiesListDiv").append(v)
                    }
                    $("#AllActivitiesListDiv").listview("refresh")
                }
            })
        }
        $.mobile.loading("hide")
    })
}
QCRM.calendar.moduleDef = function(b)
{
    var a;
    for (a in QCRM.calendar.modules) {
        if (QCRM.calendar.modules[a].module === b) {
            return QCRM.calendar.modules[a]
        }
    }
    return false
};
QCRM.calendar.ColorOfDay = function(a)
{
    return a.color === "red" ? "rgb(217,0,116)" : "rgb(0,138,0)"
};
function getCalendarModule(a, d, n, b, h, l)
{
    var m = "(XX.assigned_user_id = '" + d + "')", c, p = QCRM.calendar.moduleDef(a), e = "(XX." + p.end + " >= '" + toDBDateTime(n) + "') AND (XX." + p.start + " < '" + toDBDateTime(b) + "')", g = toDBDate(b.addHours(24));

    function o(q, K, r, J)
    {
        if (K && K.entry_list !== undefined) {
            var F = 0, D = K.entry_list.length;
            for (F = 0; F < D; F++) {
                var C = K.entry_list[F], G = {}, u, w = C.name_value_list[p.start].value, H = fromDBDateTime(w), u = toDBDate(H), z = toDBDate(fromDBDateTime(C.name_value_list[p.end].value).addHours(-0.17));
                G.name_value_list = C.name_value_list;
                G.start = w;
                G.date = u;
                G.type = q;
                G.id = C.id;
                if (K.relationship_list && K.relationship_list[F]) {
                    if (!r && (K.relationship_list[F].link_list)) {
                        G.phones = K.relationship_list[F].link_list
                    } else {
                        if (r) {
                            var B = [], s = K.relationship_list[F], E, A, I;
                            for (E = 0; E < s.length; E++) {
                                var v = {name: s[E].name, records: []};
                                A = s[E].records;
                                for (I = 0; I < A.length; I++) {
                                    v.records.push({link_value: A[I]})
                                }
                                B.push(v)
                            }
                            G.phones = B
                        }
                    }
                } else {
                    G.phones = []
                }
                h.push(G);
                while (u < z && u <= g) {
                    H.addHours(24);
                    u = toDBDate(H);
                    h.push({date: u, name_value_list: G.name_value_list, type: q, id: G.id, phones: G.phones})
                }
            }
        }
        J()
    }

    if (!Beans[a].Enabled()) {
        l();
        return
    }
    if (a !== "Meetings" || QCRM.AssignedMeetingsOnly || (sugar_version < "6.2")) {
        c = m + " AND " + e;
        c = c.replace(/XX/g, Beans[a].table);
        QCRM.get_entry_list(a, c, Beans[a].ListFieldsToSelect(), Beans[a].link_phone_fields, 0, 1000, "", function(q)
        {
            o(a, q, false, l)
        })
    } else {
        if (!QCRM.OffLine && QCRM.ServerVersion < "4.5.8") {
            c = e;
            c = c.replace(/XX/g, Beans[a].table);
            QCRM.get_relationships("Users", "Meetings", d, "meetings", c, Beans[a].ListFieldsToSelect("id"), Beans[a].link_phone_fields, "", 0, false, function(q)
            {
                o(a, q, true, l)
            })
        } else {
            if (QCRM.OffLine) {
            } else {
                m = "(" + m + " OR (m_u.user_id ='" + d + "'))"
            }
            c = m + " AND " + e;
            c = c.replace(/XX/g, Beans[a].table);
            QCRM.get_entry_list(a, c, Beans[a].ListFieldsToSelect(), Beans[a].link_phone_fields, 0, 1000, "", function(q)
            {
                o(a, q, false, l)
            })
        }
    }
}
function GetCalendarMarked(s, o, n, v)
{
    var p, h = [], a = [], q, e, g, r = {}, u = CurrentUserId;

    function m(w, z, B, b, A, C)
    {
        if (QCRM.calendar.modules[w] !== undefined) {
            getCalendarModule(QCRM.calendar.modules[w].module, z, B, b, A, function()
            {
                m(w + 1, z, B, b, A, C)
            })
        } else {
            C()
        }
    }

    if (mobile_app || mobile_edition === "Pro") {
        if (s) {
            q = new Date();
            q.setTime(s.getTime());
            q.setHours(0);
            q.setMinutes(0);
            e = new Date();
            e.setTime(q.getTime() + (24 * 3600000))
        } else {
            q = new Date(o, n - 1, 1, 0, 0);
            e = new Date(o, n + 2, 1, 0, 0);
            u = QCRM.calendar.curUser
        }
        var l = function(b)
        {
            $.each(b, function(A, B)
            {
                var C, z, w = toDBDateTime(fromDBDateTime(B.startDate, true)), D = toDBDateTime(fromDBDateTime(B.endDate, true));
                z = B.startDate.substring(0, 10);
                C = {
                    start: w,
                    name_value_list: {name: {value: B.title}, date_start: {value: w}, date_end: {value: D}},
                    phones: [],
                    type: "native",
                    date: z,
                    id: ""
                };
                h.push(C)
            })
        };
        var d = function(b)
        {
            $.each(b, function(A, B)
            {
                var C, z, w = toDBDateTime(new Date(B.dtstart)), D = toDBDateTime(new Date(B.dtend));
                if (Pref.NativeCal === true || Pref.NativeCal.indexOf(B.calendar_id) !== -1) {
                    z = toDBDate(new Date(B.dtstart));
                    C = {
                        start: w,
                        name_value_list: {name: {value: B.title}, date_start: {value: w}, date_end: {value: D}},
                        phones: [],
                        type: "native",
                        date: z,
                        id: ""
                    };
                    h.push(C)
                }
            })
        };
        var c = function(b)
        {
        };
        m(0, u, q, e, h, function()
        {
            h.sort(function(z, w)
            {
                if (z.name_value_list.date_start.value > w.name_value_list.date_start.value) {
                    return 1
                }
                if (z.name_value_list.date_start.value < w.name_value_list.date_start.value) {
                    return -1
                }
                return 0
            });
            for (p = 0; p < h.length; p++) {
                var b = h[p];
                if (r[b.date] === undefined) {
                    r[b.date] = {color: "none", elements: []}
                }
                r[b.date].elements.push(b);
                if (b.name_value_list.status && b.name_value_list.status.value === "Planned") {
                    r[b.date].color = "red"
                }
            }
            $.each(r, function(A, z)
            {
                var w = QCRM.calendar.ColorOfDay(z);
                if (w !== false) {
                    a.push({d: fromDBDate(A), color: w})
                }
            });
            v(r, a)
        })
    }
}
function GetCalendarWeekDays(b)
{
    var g = $("#calendarMOBI").mobiscroll("getValues"), e, a, c;
    if (!g || g.length < 7 || !g[0]) {
        g = [];
        a = b.getDay();
        if (a < QCRM.calendar.firstDay) {
            a += 7
        }
        for (c = 0; c < 7; c++) {
            e = new Date();
            e.setTime(b.getTime());
            g.push(e.addHours((c + QCRM.calendar.firstDay - a) * 24))
        }
    }
    return g
}
function GetCalendarDayList(l)
{
    var m = toDBDate(l), o = [l], n, c = $("#calendarList"), g = [];
    $("#calendarList li").remove();
    if (QCRM.calendar.weekmode) {
        o = GetCalendarWeekDays(l)
    }
    for (var b in o) {
        m = toDBDate(o[b]);
        if (QCRM.calendar.dates[m] !== undefined) {
            c.append('<li data-role="list-divider" data-theme="d">' + jQuery.mobiscroll.formatDate(date_format, o[b]) + "</li>");
            for (n = 0; n < QCRM.calendar.dates[m].elements.length; n++) {
                var h = QCRM.calendar.dates[m].elements[n], a = {
                    id: h.id,
                    nvl: h.name_value_list
                }, e = (h.type === "native") ? getCalendarLink(h.id, h.name_value_list) : AddLinkWithIcon(h.type, h.id, Beans[h.type].DisplayCalendarElt(h.name_value_list), h.name_value_list, h.phones, "CalendarListPage", true, "");
                c.append(e);
                if (h.type === "Meetings") {
                    g.push(a)
                }
            }
            c.listview("refresh")
        }
    }
}
function GetCalendarDayMap(b)
{
    var g = toDBDate(b), m = [b], a, e = [];
    if (QCRM.calendar.weekmode) {
        m = GetCalendarWeekDays(b)
    }
    for (var h in m) {
        g = toDBDate(m[h]);
        if (QCRM.calendar.dates[g] !== undefined) {
            for (a = 0; a < QCRM.calendar.dates[g].elements.length; a++) {
                var l = QCRM.calendar.dates[g].elements[a];
                if (l.type === "Meetings") {
                    e.push(l.id)
                }
            }
        }
    }
    if (e.length == 0) {
        $("#calendar_canvas").html(sugar_app_strings.MSG_LIST_VIEW_NO_RESULTS_BASIC)
    } else {
        if (mobile_edition == "Pro") {
            var c = "(meetings.id IN ('" + e.join("','") + "') AND meetings_cstm.jjwg_maps_geocode_status_c IN ('OK','APPROXIMATE'))";
            QCRM.get_entry_list("Meetings", c, Beans.Meetings.ListFieldsToSelect(), "", 0, 150, "", function(r)
            {
                if (r) {
                    var p = r.entry_list, o = p.length, q, n, d;
                    if (o > 0) {
                        p.sort(function(u, s)
                        {
                            if (u.name_value_list.date_start.value > s.name_value_list.date_start.value) {
                                return 1
                            }
                            return -1
                        });
                        q = p[o == 1 ? 0 : o % 2].name_value_list;
                        n = {
                            lat: q.jjwg_maps_lat_c.value,
                            lng: q.jjwg_maps_lng_c.value,
                            id: q.id,
                            module: "Meetings",
                            name: "",
                            addr: ""
                        };
                        d = JJWG.ShowBeansInMap("Meetings", p, n, "calendar_canvas", true, !QCRM.calendar.weekmode);
                        if (Beans.jjwg_Markers && $("#cal_markers_opt").is(":checked")) {
                            JJWG.ShowMarkersInMap(d, JJWG.get_where("jjwg_Markers", 50, n, "miles"), n)
                        }
                    } else {
                        $("#calendar_canvas").html(sugar_app_strings.MSG_LIST_VIEW_NO_RESULTS_BASIC)
                    }
                }
            })
        }
    }
}
function GetCalendarDay(a)
{
    if (QCRM.calendar.viewmode == "map") {
        GetCalendarDayMap(a)
    } else {
        GetCalendarDayList(a)
    }
}
function DateFromCalendar(c)
{
    var b = new Date(), a = $("#calendarMOBI").mobiscroll("getDate");
    if (a) {
        a.setHours(b.getHours())
    } else {
        a = b
    }
    init_picker(c, "datetime", a)
}
function CallFromCalendar()
{
    Beans.Calls.Create("", "", "CalendarListPage");
    DateFromCalendar("#EditCalls_date_start")
}
function MeetingFromCalendar()
{
    Beans.Meetings.Create("", "", "CalendarListPage");
    DateFromCalendar("#EditMeetings_date_start")
}
function CalendarShow()
{
    var a = QCRM.calendar.currDate, b = a.getFullYear(), d = a.getMonth(), c;
    if (!QCRM.calendar.init) {
        GetCalendarMarked(false, b, d, function(g, e)
        {
            QCRM.calendar.dates = g;
            GetCalendarDay(a);
            QCRM.calendar.init = true;
            c = {
                display: "inline",
                layout: "liquid",
                selectType: QCRM.calendar.weekmode ? "week" : "day",
                defaultValue: a,
                theme: iOS ? "ios" : "android-holo-light",
                markedDisplay: "bottom",
                startYear: (b - 1),
                endYear: (b + 1),
                lang: getMobiscrollLanguage(),
                controls: ["calendar"],
                marked: e,
                firstDay: QCRM.calendar.firstDay,
                onMonthChange: function(h, m, l)
                {
                    GetCalendarMarked(false, h, m, function(n, o)
                    {
                        QCRM.calendar.dates = n;
                        l.settings.marked = o;
                        setTimeout(function()
                        {
                            l.refresh()
                        }, (QCRM.OffLine ? 500 : 150))
                    })
                },
                onDayChange: function(h, l)
                {
                    QCRM.calendar.currDate = h.date;
                    GetCalendarDay(h.date)
                },
                onShow: function()
                {
                    $(window).off("focusin")
                }
            };
            if (QCRM.calendar.weekmode) {
                c.selectedValues = GetCalendarWeekDays(QCRM.calendar.currDate)
            }
            $("#calendarMOBI").mobiscroll().calendar(c)
        })
    }
}
$("#CalendarListPage").on("pagebeforecreate", function()
{
    $("#CalendarListPageTitle").text(RES_CALENDAR);
    AddPhonePopup("CalendarListPage");
    QCRM.calendar.curUser = CurrentUserId;
    if (!mobile_app && mobile_edition == "CE") {
        $('label[for="ActPeriod_missed"]').html(RES_MISSED);
        $('label[for="ActPeriod_today"]').html(sugar_app_list_strings.date_search.today);
        $('label[for="ActPeriod_7days"]').html(RES_7DAYS);
        $('label[for="ActPeriod_30days"]').html(RES_7DAYS.replace("7", "30"));
        $("#CalendarSubMenu input:radio").change(function(c, d)
        {
            GetActivitiesList(ActivitiesCurrentOffset)
        })
    } else {
        $("#CalendarSubMenu").remove();
        $("#AllActivitiesListDiv").remove();
        var b = create_enum_form("CalUser", "", SimpleBeans.Users.List, false, false, true, CurrentUserId);
        $("#calendarLEFT").prepend(b);
        b.css("margin-top", "0px");
        if (!QCRM.calendar.shared) {
            b.hide()
        } else {
            b.change(function(c, d)
            {
                QCRM.calendar.curUser = $("#CalUser").val();
                QCRM.calendar.init = false;
                CalendarShow()
            })
        }
        $('label[for="CalMode_day"]').html(RES_DAY);
        $('label[for="CalMode_week"]').html(RES_WEEK);
        $("#CalModeS input:radio").change(function(c, d)
        {
            QCRM.calendar.weekmode = !QCRM.calendar.weekmode;
            QCRM.calendar.init = false;
            CalendarShow()
        });
        if (!Beans.jjwg_Markers || !Beans.jjwg_Markers.Enabled()) {
            $("#cal_markers_div").hide()
        } else {
            $('label[for="cal_markers_opt"]').html(sugar_app_list_strings.moduleList.jjwg_Markers)
        }
        function a(c)
        {
            if (c) {
                QCRM.calendar.init = false;
                CalendarShow()
            }
            if (QCRM.calendar.viewmode == "map") {
                $("#CalList").hide();
                $("#CalMap").show()
            } else {
                $("#CalList").show();
                $("#CalMap").hide()
            }
        }

        if (QCRM.JJWG && (JJWG.modules.indexOf("Meetings") !== -1 || mobile_edition == "CE")) {
            $("#CalDispS input:radio").change(function(d, e)
            {
                var c = QCRM.calendar.viewmode != $(this).val();
                QCRM.calendar.viewmode = $(this).val();
                a(c)
            });
            $("#cal_markers_opt").change(function(c, d)
            {
                a(true)
            });
            if (mobile_edition == "CE") {
                $("#CalMap").html(RES_UNAVAILABLE)
            }
        } else {
            $("#CalDispS").hide()
        }
    }
    if (!Beans.Meetings.Enabled()) {
        $("#CalendarMeetingDiv").remove()
    }
    if (!Beans.Calls.Enabled()) {
        $("#CalendarCallDiv").remove()
    }
    if (QCRM.calendar.init_calendar) {
        QCRM.calendar.init_calendar()
    }
});
$("#CalendarListPage").on("pageshow", function()
{
    QCRM.History.push("#CalendarListPage");
    if (QCRM.OffLine && !Pref.NativeCal) {
        $("#CalendarRefresh").hide()
    } else {
        $("#CalendarRefresh").show()
    }
    if (mobile_app || mobile_edition == "Pro") {
        CalendarShow()
    } else {
        GetActivitiesList(ActivitiesCurrentOffset)
    }
    if (QCRM.calendar.display) {
        QCRM.calendar.display()
    }
});
$("#LastViewedListPage").on("pagebeforecreate", function()
{
    $("#LastViewedListPageTitle").text(sugar_app_strings.LBL_LAST_VIEWED)
});
$("#AllModulesListPage").on("pagebeforecreate", function()
{
    $("#AllModulesListPageTitle").text(RES_ALLMODULES);
    GetAllModulesList("AllModulesListDiv")
});
$("#AllModulesListPage").on("pageshow", function()
{
    $("#AllModulesListDiv").listview("refresh")
});
$("#LastViewedListPage").on("pageshow", function()
{
    GetLastViewedList()
});
function ShowHideToolbarLabels()
{
    var n = "", l, d = (IconsLabels ? RES_HOME_LABEL : ""), g = (IconsLabels ? sugar_app_strings.LBL_CREATE_BUTTON_LABEL : n), h = (IconsLabels ? sugar_app_strings.LBL_BACK : n), o = (IconsLabels ? RES_ALLMODULES : n), e = (IconsLabels ? sugar_app_strings.LBL_EDIT_BUTTON : n), r = (IconsLabels ? sugar_app_strings.LBL_DELETE_BUTTON_LABEL : n), u = (IconsLabels ? sugar_app_strings.LBL_LAST_VIEWED : n), m = (IconsLabels ? RES_CALENDAR : n), s = (IconsLabels ? sugar_app_strings.LBL_SEARCH_BUTTON_LABEL : n), q = (IconsLabels ? sugar_app_strings.LNK_LIST_NEXT : n), a = (IconsLabels ? sugar_app_strings.LNK_LIST_PREVIOUS : n);
    for (l in ListsPages) {
        var p = "#" + ListsPages[l];
        $(p + "ListPageHomeBtn").text(d);
        $(p + "AllModulesBtn").text(o);
        $(p + "CalendarBtn").text(m);
        $(p + "GSBtn").text(s);
        $(p + "LBackBtn").text(h);
        $(p + "LastViewedBtn").text(u)
    }
    for (l in SearchPages) {
        var c = "#" + SearchPages[l];
        $(c + "SHomeBtn").text(d);
        $(c + "ListPageSearchBtn").text(s);
        $(c + "PreviousBtn").text(a);
        $(c + "SBackBtn").text(h);
        $(c + "NextBtn").text(q);
        if (Beans[SearchPages[l]].AddBtn) {
            $(c + "ListPageAddBtn").text(g);
            $(c + "SAddBtn").text(g)
        }
    }
    for (l in ViewPages) {
        var b = "#" + ViewPages[l];
        $(b + "HomeBtn").text(d);
        $(b + "SearchBtn").text(IconsLabels ? sugar_app_strings.LBL_SEARCH_BUTTON_LABEL : n);
        $(b + "BackBtn").text(h)
    }
    if (sugar_mod_strings.Calls) {
        $("#CalendarCallBtn").text(IconsLabels ? sugar_mod_strings.Calls.NEW : n)
    }
    if (sugar_mod_strings.Meetings) {
        $("#CalendarMeetingBtn").text(IconsLabels ? sugar_mod_strings.Meetings.NEW : n)
    }
}
function seamlessLogin(c, b)
{
    if (!b && QCRM.OffLine) {
        c(null)
    } else {
        var a = {
            auth: {encryption: "PLAIN", password: Qpwd, user_name: Quser_name},
            application: "",
            name_value_list: [{name: "language", value: getSugarLanguage(sugar_languages, default_language)}]
        }
    }
    SugarQuery("login", JSON.stringify(a), function(d)
    {
        if (d !== null && mobile_app && d.name !== undefined) {
            delete a.auth.encryption;
            a.auth.password = $.md5(Qpwd);
            SugarQuery("login", JSON.stringify(a), c, null)
        } else {
            c(d)
        }
    }, null)
}
function BuildColorLegend(b)
{
    var m = Beans[b], h = $("<div/>");

    function l(p, o)
    {
        h.append('<div style="float:left;margin-left:10px;"><span style="text-shadow:none !important;">&nbsp;' + p + '</span><div style="border:1px solid #ddd;float:left;margin-left:5px;width:16px;height:16px;background:' + o + '"></div></div>')
    }

    h.empty();
    if (m.ColoredField !== "") {
        QCRM.AddToListFields(b, [m.ColoredField]);
        var d = m.ColoredField, c = m.CustomColors, e = sugar_mod_fields[b][d];
        if (e && e.options !== undefined) {
            if (c.length === 0) {
                c = ListColors
            }
            var n = sugar_app_list_strings[e.options], g = 0;
            if (n !== undefined) {
                for (var a in n) {
                    l(n[a], c[g % c.length]);
                    g++
                }
            }
        } else {
            if (c.length === 0) {
                c = ListColorsBool
            }
            h.append('<span style="float:left;margin-left:10px;">' + ((d === "assigned_user_id") ? RES_MY_ITEMS : sugar_mod_strings[b][sugar_mod_fields[b][d].label]) + "&nbsp;&nbsp;</span>");
            l(RES_NO_LABEL, c[0]);
            l(RES_YES_LABEL, c[1])
        }
        if (QCRM.mode === "tablet") {
            $("#" + b + 'ListPage [data-role="footer"]').prepend(h)
        } else {
            $("#" + b + "lLegend").append(h)
        }
    }
}
function BuildMapLegend(b, l)
{
    var m = Beans[b], g = $("#map_legend");

    function h(p, o)
    {
        g.append('<div style="float:left;margin-left:10px;"><span>&nbsp;' + ((p === "" || p === " ") ? "---   " : p) + '</span><div style="float:left;margin-left:5px;width:30px;height:30px;"><img src="images/marker_' + ((o + 1) % 25).toString() + '.png"></img></div></div>')
    }

    g.empty();
    if (m.ColoredField !== "" && !l) {
        QCRM.AddToListFields(b, [m.ColoredField]);
        var c = m.ColoredField, d = sugar_mod_fields[b][c];
        if (d && d.options !== undefined) {
            var n = sugar_app_list_strings[d.options], e = 0;
            if (n !== undefined) {
                for (var a in n) {
                    h(n[a], e);
                    e++
                }
            }
        } else {
            g.append('<span style="float:left;margin-left:10px;">' + ((c === "assigned_user_id") ? RES_MY_ITEMS : sugar_mod_strings[b][sugar_mod_fields[b][c].label]) + "&nbsp;&nbsp;</span>");
            h(RES_NO_LABEL, 0);
            h(RES_YES_LABEL, 1)
        }
    }
}
function AfterLogin(e, p)
{
    var u, s, q;

    function m(C)
    {
        var D = null;

        function b()
        {
            if ($("#PanelSearchText").val().length < 1) {
                $("#PanelSearchDiv").html("").listview("refresh")
            } else {
                GlobalSearch("PanelSearchText", "PanelSearchDiv", "", QCRM.MaxGlobalSearch, true)
            }
        }

        $("#PanelSearchText").bind("keyup change", function()
        {
            if (D) {
                window.clearTimeout(D)
            }
            D = window.setTimeout(function()
            {
                D = null;
                b()
            }, C)
        })
    }

    SimpleBeans.Users.DefValue = CurrentUserId;
    if (!QCRM.OffLine) {
        SimpleBeans.Users.Init()
    }
    for (u in SimpleBeans) {
        SimpleBeans[u].Load(SimpleBeans[u].AfterLoad)
    }
    if (mobile_edition !== "Pro") {
        Beans.Accounts.Fields = ["phone_office", "phone_fax", "website", "email1", "description", "assigned_user_name"];
        Beans.Contacts.Fields = ["title", "account_name", "email1", "phone_work", "phone_mobile", "description", "assigned_user_name"];
        Beans.Leads.Fields = ["title", "account_name", "status", "email1", "phone_work", "phone_mobile", "description", "assigned_user_name"];
        Beans.Opportunities.Fields = ["amount", "date_closed", "sales_stage", "account_name", "description", "assigned_user_name"];
        Beans.Calls.Fields = ["direction", "status", "date_start", "duration_hours", "duration_minutes", "description", "parent_name", "assigned_user_name"];
        Beans.Meetings.Fields = ["status", "date_start", "duration_hours", "duration_minutes", "description", "parent_name", "assigned_user_name"];
        Beans.Tasks.Fields = ["status", "date_start", "date_due", "priority", "description", "parent_name", "assigned_user_name"];
        Beans.Notes.Fields = ["description", "filename"];
        Beans.Accounts.Addresses = ["billing", "shipping"];
        Beans.Contacts.Addresses = ["primary", "alt"];
        Beans.Leads.Addresses = ["primary", "alt"];
        Beans.Cases.Fields = ["case_number", "type", "status", "priority", "account_name", "description"];
        Beans.Project.Fields = ["status", "priority", "description"];
        Beans.ProjectTask.Fields = ["status", "priority", "percent_complete", "assigned_user_name", "project_name", "description"];
        for (u in SearchPages) {
            var a = SearchPages[u], n = Beans[a];
            n.AdditionalFields = n.Fields.slice();
            if (n.Addresses) {
                for (var h in n.Addresses) {
                    var r = n.Addresses[h];
                    n.AdditionalFields.push("$ADD" + r)
                }
            }
        }
    }
    if (QCRM.globalSearchButton) {
        $("#searchbtndiv").show();
        $("#PanelSearchText").bind("keyup change", function()
        {
            if ($("#PanelSearchText").val().length < 1) {
                $("#PanelSearchDiv").html("").listview("refresh")
            }
        })
    } else {
        m(200)
    }
    try {
        sugar_app_list_strings.date_search.today = sugar_app_list_strings.date_search.today.charAt(0).toUpperCase() + sugar_app_list_strings.date_search.today.slice(1);
        var z = ["", "on", "isnull", "greater_than", "less_than", "before", "after", "not_equal"];
        for (s in z) {
            if (sugar_app_list_strings.date_search[z[s]] !== undefined) {
                delete sugar_app_list_strings.date_search[z[s]]
            }
        }
        sugar_app_list_strings.date_search["="] = " --- ";
        if (sugar_version < "6.2") {
            q = sugar_app_list_strings.date_search.between_dates;
            sugar_app_list_strings.date_search.between = q;
            delete sugar_app_list_strings.date_search.between_dates
        }
        sugar_app_list_strings.date_search.past = RES_PAST;
        sugar_app_list_strings.date_search.future = RES_FUTURE
    } catch (g) {
    }
    for (u in SearchPages) {
        var a = SearchPages[u], w = Beans[a];
        if (w.template === "file" && w.access != "none") {
            Beans[a].access = "view"
        }
        if (sugar_mod_fields[a] === undefined || w.access === "none") {
            Beans[a].access = "none";
            $("#Icon" + a).remove()
        }
    }
    if (sugar_app_list_strings.parent_type_display === undefined) {
        sugar_app_list_strings.parent_type_display = sugar_app_list_strings.moduleList;
        delete sugar_app_list_strings.parent_type_display.Users
    }
    if (Beans.QCRM_SavedSearch !== undefined) {
        Beans.QCRM_SavedSearch.Init();
        s = localStorage.getItem(ServerAddress + "SavedSearch");
        if (s === null || s === "") {
            Beans.QCRM_SavedSearch.LoadAll(true, false)
        } else {
            Beans.QCRM_SavedSearch.LoadAll(false, true)
        }
    }
    if (Beans.Favorites !== undefined) {
        Beans.Favorites.Init()
    }
    for (u in ViewPages) {
        var s, A = ViewPages[u], c = Beans[A], l = c.AllFields();
        for (var v in l) {
            var B = l[v], o = sugar_mod_fields[A][B];
            if (o !== undefined && o.type === "phone" && B !== "phone_fax") {
                c.PhoneFields.push(B);
                QCRM.AddToListFields(A, B)
            }
        }
        BuildColorLegend(A);
        if (typeof QCRM[A + "Setup"] === "function") {
            QCRM[A + "Setup"]()
        }
        for (s in c.hooks.install) {
            try {
                c.hooks.install[s]()
            } catch (g) {
                AlertPopup("Error found in " + e + " init_edit:/n" + g)
            }
        }
        c.CreateHook()
    }
    for (u in js_plugins) {
        var d = QCRM[js_plugins[u].substr(0, js_plugins[u].length - 3)];
        if (typeof d === "function") {
            d()
        }
    }
    for (u in QCRM.customInit) {
        QCRM.customInit[u]()
    }
    for (u in QCRM.hooks.after_login) {
        try {
            QCRM.hooks.after_login[u]()
        } catch (g) {
            AlertPopup("Error found in after_login:/n" + g)
        }
    }
    if ((mobile_edition === "Pro" || mobile_app) && Pref.Alerts && !QCRM.OffLine) {
        CronAlerts()
    }
    if (QCRM.JJWG) {
        JJWG.jjwg_init()
    }
    QCRM.updateBeans();
    updateDashlets();
    if (e !== "") {
        setTimeout(function()
        {
            $.mobile.pageContainer.pagecontainer("change", e)
        })
    }
    $.mobile.loading("hide");
    if (QCRM.OffLine && typeof QuickCRMAfterLogin == "function") {
    }
    if (!QCRM.OffLine && typeof CustomCron == "function") {
        CustomCronStart()
    }
    if (!QCRM.OffLine && QCRM.webdb && QCRM.webdb.db) {
        QCRM.webdb.db.transaction(function(b)
        {
            QCRM.webdb.CheckUpdates(b, function()
            {
                for (var E in QCRM.beans) {
                    var D = QCRM.beans[E];
                    if (Beans[D].access === "none") {
                        continue
                    }
                    QCRM.webdb.createTable(D, false, b)
                }
                QCRM.webdb.createRelTable(b);
                if (typeof QCRM.CustomSyncCreate === "function") {
                    QCRM.CustomSyncCreate()
                }
                for (var C in SimpleBeans) {
                    QCRM.webdb.createSTable(C, b)
                }
                QCRM.webdb.updateConfig("QVersion", QCRM.webdb.CurrentVersion, b);
                QCRM.webdb.updateConfig("quickcrm_upd_time", quickcrm_upd_time, b)
            })
        })
    }
    if (!QCRM.OffLine && QCRM.saveToCRM && Beans.QCRM_SavedSearch !== undefined) {
        Beans.QCRM_SavedSearch.SaveAll(true)
    }
    if (QCRM.forceLock && !Pref.AppLock) {
        setTimeout(function()
        {
            $("#LockBtn").click()
        }, 100)
    }
}
function onResume()
{
    var a = toDBDate(CurrentDate);
    if (mobile_edition === "Pro" && sugar_version > "6.3" && QCRM.webdb && typeof openDatabase !== "undefined") {
        QCRM.webdb.resume()
    }
    if (!QCRM.OffLine) {
        seamlessLogin(function(b)
        {
            if (b && b.id && b.name_value_list !== undefined) {
                SugarSessionId = b.id;
                if (Pref.Alerts) {
                    CronAlerts()
                }
            }
            if (typeof CustomCron == "function") {
                CustomCronStart()
            }
        })
    }
    QCRM.calendar.init = false;
    CurrentDate = new Date();
    if (a !== toDBDate(CurrentDate)) {
        QCRM.TodayDashlet.CurDate = new Date();
        QCRM.reminders.update()
    }
    unlocked = (Pref.AppLock === false);
    RequestPassword()
}
function onPause()
{
    if (!QCRM.OffLine) {
        if (Pref.Alerts) {
            StopAlerts()
        }
        if (typeof CustomCron == "function") {
            CustomCronStop()
        }
    }
}
function LoginUser(h, g)
{
    var l = $("#SettingsUsername").val(), d, b = $("#SettingsPassword").val(), e = false, a = "";
    $.mobile.loading("show");
    if (!h) {
        if (sugar_version >= "6.3") {
            a = '"encryption":"PLAIN",'
        } else {
            b = $.md5(b)
        }
        d = b
    }
    setTimeout(function()
    {
        if (!e) {
            AjaxErr()
        }
    }, 4000);
    SugarQuery("login", "[{" + a + '"password":"' + b + '","user_name":"' + l + '"},"",""]', function(c)
    {
        e = true;
        if (c) {
            if (c.name !== undefined) {
                $.mobile.loading("hide");
                h === undefined ? LoginUser(true) : AlertPopup(RES_WRONG_PASWD)
            } else {
                SugarSessionId = c.id;
                CurrentUserId = c.name_value_list.user_id.value;
                getUserFormats(c.name_value_list);
                $("#SettingsUsername").val("");
                $("#SettingsPassword").val("");
                localStorage.setItem("SugarId", CurrentUserId);
                AfterLogin(g === undefined ? "#HomePage" : g)
            }
        } else {
            AlertPopup("An unexpected error occurred logging in.");
            $.mobile.loading("hide")
        }
    }, null)
}
function Disconnect()
{
}
function LogOutUser()
{
    ForceLogin = (!mobile_app);
    SugarQuery("logout", '[{"session":"' + SugarSessionId + '"}]', function()
    {
        AppReload()
    }, null)
}
function GetBeansList(r, v, o, m, u, z)
{
    var w, p = r.length;
    if (m !== undefined && m !== "") {
        $("#" + v).append('<li data-role="list-divider">' + m + "</li>")
    }
    for (w = 0; w < p; w++) {
        var s = r[w], n = $("<li" + (o && !z ? ' data-icon="false"' : "") + "/>"), a = s.module;
        if (Beans[a] !== undefined && Beans[a].Enabled()) {
            var q = s.name, g = createLink(a, s.id), c = createEditLink(a, s.id, z);
            if (o) {
                g.css({"font-size": "12px"})
            }
            g.addClass(s.module + "SIcon");
            g.css({"padding-left": "20px"});
            g.append(q);
            n.append(g);
            if (z) {
                n.append(c)
            }
            $("#" + v).append(n)
        }
    }
    try {
        if (u === undefined || u === true) {
            $("#" + v).listview("refresh")
        } else {
            $("#" + v).listview().listview("refresh")
        }
    } catch (h) {
    }
}
function GetBeansListIds(h, g)
{
    var c, a = h.length, e = [];
    for (c = 0; c < a; c++) {
        var l = h[c];
        if (l.module === g) {
            e.push(l.id)
        }
    }
    return e
}
function Remove1FromList(b, e)
{
    var d, a = b.length;
    for (d = 0; d < a; d++) {
        if (b[d].id === e) {
            b.splice(d, 1);
            break
        }
    }
}
function SaveList(d, b)
{
    var e = "a", g, a = d.length;
    for (g = 0; g < a; g++) {
        e += "@@" + d[g].id + "@@" + d[g].module + "@@" + d[g].name
    }
    localStorage.setItem(b, e)
}
function LoadList(e)
{
    var d = localStorage.getItem(e);
    var g = [];
    if (d !== null && d !== "" && d !== "a") {
        d = d.split("@@");
        var c, a = (d.length - 1) / 3;
        for (c = 0; c < a; c++) {
            g[c] = {id: d[3 * c + 1], module: d[3 * c + 2], name: d[3 * c + 3]}
        }
    }
    return g
}
function PushViewed(b, c, a)
{
    Remove1FromLastviewed(b, c);
    LastViewed.unshift({module: b, id: c, name: a});
    if (LastViewed.length > 10) {
        LastViewed.pop()
    }
    SaveLastviewed()
}
function GetLastViewedList()
{
    $.mobile.loading("show");
    $("#LastViewedListDiv li").remove();
    GetBeansList(LastViewed, "LastViewedListDiv", false, "", true, true);
    $.mobile.loading("hide")
}
function SaveLastviewed()
{
    SaveList(LastViewed, "LastViewed");
    $("#LastViewedPanelDiv li").remove();
    GetBeansList(LastViewed, "LastViewedPanelDiv", true, sugar_app_strings.LBL_LAST_VIEWED, true, true);
    $("#HomePanel").trigger("updatelayout")
}
function Remove1FromLastviewed(a, b)
{
    Remove1FromList(LastViewed, b)
}
function RemoveFromLastviewed(a, b)
{
    Remove1FromLastviewed(a, b);
    SaveLastviewed()
}
function PushFavorites(b, c, a)
{
    Remove1FromFavorites(b, c);
    Favorites.unshift({module: b, id: c, name: a});
    if (Favorites.length > 20) {
        LastViewed.pop()
    }
    SaveFavorites()
}
function UpdateFavoritesPanel(b)
{
    $("#FavoritesPanelDiv li").remove();
    var a = "Favorites";
    if (sugar_app_strings.LBL_FAVORITES && sugar_app_strings.LBL_FAVORITES != "LBL_FAVORITES") {
        a = sugar_app_strings.LBL_FAVORITES
    }
    GetBeansList(Favorites, "FavoritesPanelDiv", true, a, b, true)
}
function SaveFavorites()
{
    SaveList(Favorites, "Favorites");
    UpdateFavoritesPanel(true);
    $("#HomePanel").trigger("updatelayout")
}
function Remove1FromFavorites(a, b)
{
    Remove1FromList(Favorites, b)
}
function RemoveFromFavorites(a, b)
{
    Remove1FromFavorites(a, b);
    SaveFavorites()
}
function isFavorite(b, e)
{
    var d, a = Favorites.length;
    for (d = 0; d < a; d++) {
        if (Favorites[d].id === e && Favorites[d].module === b) {
            return true
        }
    }
    return false
}
function showFavoriteStatus(d, e, c)
{
    var b = $("." + d + "Fav"), a = isFavorite(d, e);
    if (Beans[d].Favorites) {
        b.data("name", c);
        b.data("favorite", a);
        b.show();
        if (a) {
            b.addClass("FavSet");
            b.removeClass("FavUnset")
        } else {
            b.removeClass("FavSet");
            b.addClass("FavUnset")
        }
    }
}
$("#GSListPage").on("pagecreate", function()
{
    $("#GSPageTitle").text(RES_SEARCH_LABEL)
});
$("#GlobalSearch").on("pagecreate", function()
{
    $("#GlobalSearchTitle").text(RES_SEARCH_LABEL);
    $("#GSSubmit").text(sugar_app_strings.LBL_SEARCH_BUTTON_LABEL);
    enableButton("GSSubmit", false);
    $("#GSSearchText").bind("keyup", function(a, b)
    {
        enableButton("GSSubmit", $("#GSSearchText").val().length >= 2)
    })
});
QCRM.GSBeans = [];
QCRM.updateBeans = function()
{
    var a = ["Accounts", "Contacts", "Leads", "Opportunities", "Cases", "Project"];
    QCRM.name_tpl = "{first_name} {last_name}";
    QCRM.GSBeans = [];
    if (QCRM.UnifiedSearch) {
        a = QCRM.UnifiedSearch
    } else {
        if (sugar_version > "6.5") {
            a.push("Tasks")
        }
    }
    $.each(a, function(b, c)
    {
        if (Beans[c] !== undefined && Beans[c].Enabled()) {
            QCRM.GSBeans.push(c)
        }
    });
    if (QCRM.name_format) {
        QCRM.name_format = QCRM.name_format.replace("s ", "");
        QCRM.name_tpl = QCRM.name_format.replace("f", "{first_name}").replace("l", "{last_name}")
    }
    $.each(QCRM.beans, function(h, g)
    {
        var n = Beans[g], b, o;
        if (n && n.Enabled() && sugar_mod[g]) {
            var d, e, m;
            if (sugar_mod) {
                o = n.template;
                b = (o === "person");
                if (g != "Documents" && o != "file") {
                    if (!sugar_mod_fields[g].name) {
                        sugar_mod_fields[g].name = {type: "name", label: RES_NAME_LABEL}
                    }
                    sugar_mod_fields[g].name.get_where = function(q, p, l)
                    {
                        return matchName(n, "default", p)
                    }
                } else {
                    if (g != "Documents" && o == "file") {
                        QCRM.AddToListFields(g, ["file_ext", "file_mime_type", "uploadfile"])
                    }
                }
                if (n.highlighted && n.highlighted.length > 0) {
                    m = "<h4>";
                    d = n.highlighted;
                    for (e in d) {
                        var c = "{" + ((e > 0) ? "-" : "") + d[e] + "}";
                        if (b && d[e] == "name") {
                            c = QCRM.name_tpl;
                            QCRM.AddToListFields(g, ["first_name", "last_name"])
                        } else {
                            QCRM.AddToListFields(g, [d[e]])
                        }
                        m += ((e > 0) ? " " : "") + c
                    }
                    m += "</h4><p>"
                } else {
                    m = "<h4>" + (b ? QCRM.name_tpl : ((g === "Documents" || o === "file") ? "{document_name}" : "{name}")) + "</h4><p>"
                }
                d = n.CustomListFields;
                if (d && d.length > 0) {
                    for (e in d) {
                        var c = "{" + ((e > 0 && e != 3) ? "-" : "") + d[e] + "}";
                        if (b && d[e] == "name") {
                            c = QCRM.name_tpl;
                            QCRM.AddToListFields(g, ["first_name", "last_name"])
                        } else {
                            QCRM.AddToListFields(g, [d[e]])
                        }
                        if (Pref.FieldsLabels) {
                            m += ((e > 0) ? " - " : "") + display_label(g, d[e]) + " {" + d[e] + "}"
                        } else {
                            m += (e == 3 ? "<br>" : "") + c
                        }
                    }
                }
                m += "</p>";
                if (Beans[g].CustomListViewTpl === false) {
                    Beans[g].ListViewTpl = m
                } else {
                    Beans[g].ListViewTpl = Beans[g].CustomListViewTpl
                }
                if (b) {
                    Beans[g].TitleTpl = QCRM.name_tpl
                }
                Beans[g].TableViewTpl = n.CustomListFields
            }
        }
    });
    if (typeof CustomUpdateBean === "function") {
        $.each(QCRM.beans, function(b, c)
        {
            if (Beans[c] !== undefined && Beans[c].Enabled()) {
                CustomUpdateBean(c)
            }
        })
    }
    $.each(QCRM.beans, function(b, d)
    {
        var c = Beans[d];
        if (c !== undefined && c.Enabled()) {
            ComputeFieldsToUpdate(d)
        }
    });
    $.each(QCRM.phoneModules, function(b, c)
    {
        if (Beans[c] && Beans[c].Enabled()) {
            ComputePhoneFields(c)
        }
    })
};
function GlobalSearch(b, d, g, a, c)
{
    var e = [], h = ((Pref.PartialSearch && !QCRM.ExactGlobalSearch) ? "%" : "") + $("#" + b).val().replace('"', '\\"');
    if (h.length < 2 || QCRM.GSBeans.length === 0) {
        return
    }
    if (g != "") {
        $("body").pagecontainer("change", "#" + g)
    }
    $.mobile.loading("show");
    $("#" + d + " li").remove();
    QCRM.search_by_module(QCRM.GSBeans, h, 0, a, function(u)
    {
        if (u && u.entry_list !== undefined) {
            var o, p = u.entry_list.length;
            if (p > 0) {
                $("#" + d + " li").remove()
            }
            for (o = 0; o < p; o++) {
                var n = u.entry_list[o], q = n.records.length, s;
                for (s = 0; s < q; s++) {
                    e.push({
                        module: n.name,
                        id: n.records[s].id.value,
                        name: getFromTemplate(n.name, n.records[s], Beans[n.name].GlobalSearchTpl)
                    })
                }
            }
            GetBeansList(e, d, c, "", true, "alt-icon")
        }
        $.mobile.loading("hide")
    })
}
var LastModified = [], tmpLastModified = [], cronLastModifiedId = false, customCronId = false, cronGPSId = false;
if (mobile_edition === "Pro" || mobile_app) {
    function CronGPS()
    {
        if (QCRM.JJWG && mobile_app) {
            setTimeout(JJWG.getCurrentPosition, 1000);
            if (cronGPSId === false) {
                cronGPSId = setInterval(JJWG.getCurrentPosition, 300000)
            }
        }
    }

    function StopCronGPS()
    {
        if (cronGPSId !== false) {
            clearInterval(cronGPSId);
            cronGPSId = false
        }
    }

    function CronAlerts()
    {
        setTimeout(SearchLastModified, 2000);
        if (cronLastModifiedId === false) {
            cronLastModifiedId = setInterval(SearchLastModified, 300000)
        }
    }

    function StopAlerts()
    {
        if (cronLastModifiedId !== false) {
            clearInterval(cronLastModifiedId);
            cronLastModifiedId = false
        }
    }

    function CustomCronStart()
    {
        setTimeout(CustomCron, 2000);
        if (customCronId === false) {
            customCronId = setInterval(CustomCron, CustomCronInterval)
        }
    }

    function CustomCronStop()
    {
        if (customCronId !== false) {
            clearInterval(customCronId);
            customCronId = false
        }
    }

    function SearchLastModified()
    {
        function d(h, m)
        {
            var l = h.toLowerCase() + ".";
            var g = l + "date_modified > '" + m + "' AND " + l + "modified_user_id != '1' AND " + l + "modified_user_id != '" + CurrentUserId + "' AND " + l + "assigned_user_id = '" + CurrentUserId + "'";
            SugarQuery("get_entry_list", '{"session":"' + SugarSessionId + '","module_name":"' + h + '","query":"' + g + '","order_by":"date_modified desc","offset":"","select_fields":' + Beans[h].ListFieldsToSelect() + ',"link_name_to_fields_array":"","max_results":5,"deleted":0}', function(w)
            {
                if (w && w.entry_list !== undefined) {
                    var n;
                    for (n = 0; n < w.entry_list.length; n++) {
                        var v = w.entry_list[n], s = {}, u = Beans[h], r = false;
                        for (var p in tmpLastModified) {
                            var q = tmpLastModified[p];
                            if (q.id === v.id && q.module === h) {
                                r = true;
                                break
                            }
                        }
                        if (!r) {
                            if (h === "Calls" || h === "Meetings") {
                                QCRM.calendar.init = false
                            }
                            tmpLastModified.unshift({module: h, id: v.id, name: u.DisplayTitle(v.name_value_list)});
                            if (tmpLastModified.length > 10) {
                                tmpLastModified.pop()
                            }
                        }
                    }
                }
            }, null)
        }

        tmpLastModified = LastModified;
        var e = localStorage.getItem(ServerAddress + "ModifiedStamp"), b = new Date();
        if (e === null || e === "") {
            e = new Date();
            e = toDBDateTime(e.addHours(-48))
        }
        localStorage.setItem(ServerAddress + "ModifiedStamp", toDBDateTime(new Date(b.getTime() - 300000)));
        var c = ["Calls", "Meetings", "Contacts", "Leads", "Cases", "Tasks"];
        for (var a in c) {
            if (Beans[c[a]].Enabled()) {
                d(c[a], e)
            }
        }
        setTimeout(GetNotificationList, 1000)
    }

    function ClearLastModified()
    {
        LastModified = [];
        $("#HomeNotify").popup("close");
        $("#NotifyHomeBtn").hide();
        SaveList(LastModified, "LastModified")
    }

    function GetNotificationList()
    {
        LastModified = tmpLastModified;
        if (LastModified.length > 0) {
            $("#NotifyListDiv li").remove();
            GetBeansList(LastModified, "NotifyListDiv", true);
            $("#NotifyClear").button();
            $("#NotifyHomeBtn").show()
        } else {
            $("#NotifyHomeBtn").hide()
        }
        SaveList(LastModified, "LastModified")
    }
}
function GetAllModulesList(h)
{
    $("#" + h + " li").remove();
    SearchPages = SearchPages.sort(function(e, d)
    {
        return sugar_app_list_strings.moduleList[e] < sugar_app_list_strings.moduleList[d] ? -1 : 1
    });
    var c, a = SearchPages.length;
    for (c = 0; c < a; c++) {
        var p = SearchPages[c];
        if (Beans[p].Enabled() && Beans[p].ShowTab) {
            var m = $("<li data-split-theme='d'/>"), o = sugar_app_list_strings.moduleList[Beans[p].name], g = $("<a/>", {href: "#" + Beans[p].name + "ListPage"});
            g.addClass(Beans[p].name + "SIcon");
            g.css({"padding-left": "20px"});
            g.append(o);
            m.append(g);
            var n = $('<a data-icon="plus" data-role="button" class="ui-alt-icon ui-nodisc-icon"/>', {href: "#"});
            n.click({page: SearchPages[c]}, function(b)
            {
                Beans[b.data.page].Create("", "", "HomePage")
            });
            m.append(n);
            $("#" + h).append(m)
        }
    }
    $("#" + h).listview()
}
function LogCall(c, a, m, e, d)
{
    if ((mobile_edition == "Pro") && Beans.Calls.Enabled() && Pref.LogCalls && (c !== "Employees") && (c !== "Users")) {
        var n, p = "", g = "", l = !Beans.Calls.fullPage, h = $("body").pagecontainer("getActivePage").attr("id");
        for (n in Beans.Calls.Links) {
            if (Beans.Calls.Links[n].module === c) {
                p = n;
                break
            }
        }
        for (n in Beans[c].Links) {
            if (Beans[c].Links[n].module === "Calls") {
                g = n;
                break
            }
        }
        if (c === "Calls" && !d) {
            QCRM.set_entry("Calls", a, {status: {name: "status", value: "Held"}}, function(q)
            {
                Beans.Calls.CurrentId = a;
                $("body").pagecontainer("change", "#Calls" + (l ? "ListPage" : "DP"));
                if (l) {
                    Beans.Calls.ViewDetails()
                }
            })
        }
        if (c !== "Calls") {
            seamlessLogin(function(q)
            {
            });
            var b = {}, o = "";
            if (e && c !== "Accounts" && e !== "") {
                o = e
            } else {
                if (c === "Accounts" && a !== "") {
                    o = a
                }
            }
            if (o !== "") {
                b.parent_id = {name: "parent_id", value: o};
                b.parent_type = {name: "parent_type", value: "Accounts"}
            } else {
                b.parent_id = {name: "parent_id", value: a};
                b.parent_type = {name: "parent_type", value: c}
            }
            $.extend(b, Beans.Calls.LoggedCall(b, m));
            if (Beans.Calls.CustomLoggedCall) {
                $.extend(b, Beans.Calls.CustomLoggedCall(b, m))
            }
            $.extend(b, Beans.Calls.CustomValues(b, true));
            QCRM.set_entry("Calls", "", b, function(q)
            {
                if (!q || ((q.name !== undefined) && (q.name === "Access Denied"))) {
                    return
                }
                Beans.Calls.CurrentId = q.id;
                if (c !== "Accounts" && p !== "") {
                    QCRM.set_relationship("Calls", Beans.Calls.CurrentId, p, a)
                }
                if (g !== "") {
                    QCRM.set_relationship(c, a, g, Beans.Calls.CurrentId)
                }
                if (sugar_version >= "6.1") {
                    QCRM.set_relationship("Calls", Beans.Calls.CurrentId, "users", CurrentUserId)
                }
                $("body").pagecontainer("change", "#Calls" + (l ? "ListPage" : "DP"));
                if (l) {
                    Beans.Calls.ViewDetails()
                }
            })
        }
    }
}
function defaultPreferences()
{
    var r, D, H, E, u, B, K, b, e, q, K, z, g, v, C, n, F, c = {}, p = {}, l = false, o = [], a = [], I;
    if (mobile_edition === "Pro") {
        Pref = {
            AudioNotes: mobile_app && QCRM.AudioNotes,
            PDFInApp: mobile_app,
            Reminders: true,
            NativeCal: QCRM.native_cal,
            Today: true,
            PartialSearch: true,
            AppLock: false,
            LogCalls: true,
            Alerts: mobile_app,
            FilterOldDate: "",
            FilterOld: [],
            FieldsLabels: false,
            HideEmptySubP: true,
            Creates: [],
            Hidden: [],
            Disabled: [],
            SyncModules: {},
            OffLineNb: 400,
            ActivitiesWhere: "",
            ActivitiesFrom: 0,
            ActivitiesTo: 0,
            Activities_planned: true,
            Activities_held: true,
            Activities_not_held: true,
            ActivitiesMine: false
        }
    } else {
        Pref = {
            AudioNotes: false,
            PDFInApp: mobile_app,
            Reminders: true,
            NativeCal: mobile_app,
            Today: false,
            PartialSearch: true,
            AppLock: false,
            LogCalls: false,
            Alerts: mobile_app,
            FilterOldDate: "",
            FilterOld: [],
            FieldsLabels: false,
            HideEmptySubP: true,
            Creates: [],
            Hidden: [],
            Disabled: [],
            SyncModules: {},
            ActivitiesWhere: "",
            ActivitiesFrom: 0,
            ActivitiesTo: 0,
            Activities_planned: true,
            Activities_held: true,
            Activities_not_held: true,
            ActivitiesMine: false
        }
    }
    LastViewed = LoadList("LastViewed");
    Favorites = LoadList("Favorites");
    LastModified = LoadList("LastModified");
    r = getCookie("OptIconsLabels");
    if (r === "1") {
        IconsLabels = true
    } else {
        if (r === "0") {
            IconsLabels = false
        }
    }
    tmpIconsLabels = IconsLabels;
    if (mobile_edition === "Pro") {
        r = getCookie("ActivitiesTo");
        if (r !== null && r !== "") {
            Pref.ActivitiesTo = r;
            Pref.ActivitiesFrom = getCookie("ActivitiesFrom");
            Pref.LogCalls = (getCookie("OptLogCalls") === "1");
            Pref.ActivitiesMine = (getCookie("OptActMyItems") === "1");
            Pref.Activities_planned = (getCookie("ActStatus_planned") === "1");
            Pref.Activities_held = (getCookie("ActStatus_held") === "1");
            Pref.Activities_not_held = (getCookie("ActStatus_not_held") === "1")
        }
        createDashlets();
        if ((QuickCRMAddress + "SavedSearches") in localStorage) {
            r = localStorage.getItem(QuickCRMAddress + "SavedSearches");
            localStorage.setItem(ServerAddress + "SavedSearches", r);
            localStorage.removeItem(QuickCRMAddress + "SavedSearches")
        }
        if ((QuickCRMAddress + "ModifiedStamp") in localStorage) {
            r = localStorage.getItem(QuickCRMAddress + "ModifiedStamp");
            localStorage.setItem(ServerAddress + "ModifiedStamp", r);
            localStorage.removeItem(QuickCRMAddress + "ModifiedStamp")
        }
    }
    r = getCookie("SortOrder");
    if (r !== null && r !== "") {
        r = jQuery.parseJSON(r);
        for (var A in r) {
            if (Beans[A] !== undefined) {
                Beans[A].OrderBy = r[A]
            }
        }
    }
    if (mobile_app) {
    }
    r = getCookie("OptRowsPerPage");
    if (r !== null && r !== "") {
        RowsPerPage = parseInt(r, 10)
    }
    r = getCookie("OptRowsPerSubpanel");
    if (r !== null && r !== "") {
        RowsPerSubPanel = parseInt(r, 10)
    }
    if (mobile_edition === "Pro") {
        r = getCookie("OptRowsPerDashlet");
        if (r !== null && r !== "") {
            RowsPerDashlet = parseInt(r, 10)
        }
        r = localStorage.getItem("SyncModules" + ServerAddress);
        if (r !== null && r !== "") {
            Pref.SyncModules = jQuery.parseJSON(r)
        } else {
            r = localStorage.getItem("SyncModules");
            if (r !== null && r !== "") {
                localStorage.getItem("SyncModules" + ServerAddress, r);
                localStorage.removeItem("SyncModules");
                Pref.SyncModules = jQuery.parseJSON(r)
            }
        }
        $.each(QCRM.beans, function(d, m)
        {
            if (Beans[m].SyncOptions) {
                Pref.SyncModules[m] = {preset: true, sync: Beans[m].SyncOptions.sync, max: Beans[m].SyncOptions.max}
            } else {
                if (Pref.SyncModules[m] === undefined) {
                    Pref.SyncModules[m] = Beans[m].SyncDefaults
                }
                Pref.SyncModules[m].preset = false
            }
        });
        if (Pref.SyncModules.Documents && Pref.SyncModules.Documents.sync !== "None") {
            Pref.SyncModules.Documents.attachments = true
        }
        if (QCRM.webdb && QCRM.webdb.MaxRecords) {
            Pref.OffLineNb = QCRM.webdb.MaxRecords
        }
        r = getCookie("OffLineNb");
        if (r !== null && r !== "") {
            Pref.OffLineNb = r
        }
        r = getCookie("OptToday");
        if (r === "1") {
            Pref.Today = true
        } else {
            if (r === "0") {
                Pref.Today = false
            }
        }
    }
    r = localStorage.getItem(ServerAddress + "NativeCal");
    if (r === "1") {
        Pref.NativeCal = true
    } else {
        if (r === "0") {
            Pref.NativeCal = false
        } else {
            if (r !== null && r !== "") {
                Pref.NativeCal = jQuery.parseJSON(r)
            }
        }
    }
    if (mobile_app && iOS && mobile_edition == "Pro") {
    }
    r = localStorage.getItem("PartialSearch");
    if (r === "1") {
        Pref.PartialSearch = true
    } else {
        if (r === "0") {
            Pref.PartialSearch = false
        }
    }
    if (mobile_edition === "Pro" || mobile_app) {
        r = localStorage.getItem("Alerts");
        if (r === "1") {
            Pref.Alerts = true
        } else {
            if (r === "0") {
                Pref.Alerts = false
            }
        }
        r = localStorage.getItem("HideEmptySubP");
        if (r === "1") {
            Pref.HideEmptySubP = true
        } else {
            if (r === "0") {
                Pref.HideEmptySubP = false
            }
        }
    }
    r = localStorage.getItem("FilterOldDate");
    if (r !== null) {
        Pref.FilterOldDate = r
    }
    r = localStorage.getItem("FilterOld");
    if (r !== null) {
        Pref.FilterOld = [];
        if (r !== "") {
            r = r.split(",");
            for (var A in r) {
                if (QCRM.beans.indexOf(r[A]) !== -1) {
                    Pref.FilterOld = Pref.FilterOld.concat(r[A])
                }
            }
        }
    }
    if (Beans.Emails !== undefined) {
        Beans.Emails.HomeIcon = false
    }
    if (mobile_edition === "Pro") {
        r = localStorage.getItem(ServerAddress + "SavedSearches");
        if (r !== null && r !== "") {
            o = jQuery.parseJSON(r);
            for (u in o) {
                B = o[u];
                l = true;
                if (B.v >= 2) {
                    break
                }
                K = B.module;
                b = Beans[K].SearchFields;
                z = B.fields;
                C = "Search" + B.module;
                F = C.length;
                for (E in z) {
                    g = z[E];
                    if (g.field.substring(0, F) === C && g.type === "chk") {
                        for (D in b) {
                            H = b[D];
                            v = sugar_mod_fields[K][H];
                            n = C + "_" + H;
                            if (g.field.substring(0, n.length) === n && v !== undefined && (v.type === "enum" || v.type === "multienum")) {
                                q = sugar_app_list_strings[v.options];
                                for (e in q) {
                                    if (C + "_" + H + "_" + e.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, "") === g.field.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, "")) {
                                        if (p[u] === undefined) {
                                            p[u] = []
                                        }
                                        p[u].push(E);
                                        if (c[u] === undefined) {
                                            c[u] = {}
                                        }
                                        if (c[u][H] === undefined) {
                                            c[u][H] = {field: C + "_" + H, type: "sel", val: []}
                                        }
                                        if (g.val) {
                                            c[u][H].val.push(e)
                                        }
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (l) {
                for (u in o) {
                    B = o[u];
                    K = B.module;
                    b = Beans[K].SearchFields;
                    z = B.fields;
                    C = "Search" + B.module;
                    if (p[u] === undefined) {
                        B.v = 2;
                        a.push(B)
                    } else {
                        I = {v: 2, module: B.module, name: B.name, fields: [], home: B.home, order: B.order};
                        for (E in z) {
                            g = z[E];
                            if (p[u].indexOf(E) === -1) {
                                I.fields.push(g)
                            }
                        }
                        for (E in c[u]) {
                            g = c[u][E];
                            I.fields.push(g)
                        }
                        a.push(I)
                    }
                }
                localStorage.removeItem(ServerAddress + "SavedSearches")
            }
            for (u in a) {
                var J = o[u], w = QCreateId(), h = toDBDateTime(new (Date)), G = {
                    id: w,
                    type: "Search",
                    module: J.module
                };
                QCRM.SavedSearches[w] = {
                    id: w,
                    date_modified: h,
                    date_entered: h,
                    name: J.name.trim(),
                    type: J.module,
                    fields: J.fields,
                    sort_order: J.order,
                    assigned_user_id: CurrentUserId
                };
                QCRM.SavedSearches[w][shared_field] = false;
                if (J.home === true || J.home === "I") {
                    QCRM.DashletAdd(QCRM.searchIcons, G)
                } else {
                    if (J.home === "D") {
                        QCRM.DashletAdd(QCRM.Dashlets, G)
                    }
                }
            }
        } else {
        }
    }
    r = getCookie(ServerAddress + "Icons");
    if (r !== null) {
        if (r !== "") {
            l = true;
            r = r.split(",");
            for (var A in r) {
                if (QCRM.beans.indexOf(r[A]) !== -1) {
                    Pref.Hidden = Pref.Hidden.concat(r[A])
                }
            }
        }
    } else {
        $.each(QCRM.beans, function(d, m)
        {
            if (!Beans[m].HomeIcon) {
                Pref.Hidden = Pref.Hidden.concat(m)
            }
        })
    }
    r = getCookie("Creates");
    if (mobile_edition === "Pro" && r !== null) {
        if (r !== "") {
            r = r.split(",");
            for (var A in r) {
                if (QCRM.beans.indexOf(r[A]) !== -1) {
                    Pref.Creates = Pref.Creates.concat(r[A])
                }
            }
            l = true
        }
    }
    if (l) {
        QCRM.saveToCRM = true;
        SaveSearchesAndHomePage();
        if ((ServerAddress + "SavedSearches") in localStorage) {
            localStorage.removeItem(ServerAddress + "SavedSearches")
        }
        if ((ServerAddress + "Icons") in localStorage) {
            localStorage.removeItem(ServerAddress + "Icons")
        }
        if ("Creates" in localStorage) {
            localStorage.removeItem("Creates")
        }
    } else {
        r = localStorage.getItem(ServerAddress + "SavedSearch");
        if (r !== null && r !== "") {
            QCRM.SavedSearches = jQuery.parseJSON(r)
        }
        LoadHomePageDef()
    }
}
function updatePreferences(c)
{
    if (c) {
        ShowHideToolbarLabels()
    }
    if (mobile_edition === "Pro") {
        var b = "";
        Pref.ActivitiesWhere = "";
        if (Pref.ActivitiesFrom > 0) {
            var a = new Date(CurrentDate.getTime() - Pref.ActivitiesFrom * 86400000);
            Pref.ActivitiesWhere += "(date_start >= '" + toDBDate(a) + "')"
        }
        if (Pref.ActivitiesTo > 0) {
            var d = new Date(CurrentDate.getTime() + Pref.ActivitiesTo * 86400000);
            Pref.ActivitiesWhere += "(date_start <= '" + toDBDate(d) + "')"
        }
        if ((Pref.Activities_planned || Pref.Activities_held || Pref.Activities_not_held) && (!Pref.Activities_planned || !Pref.Activities_held || !Pref.Activities_not_held)) {
            if (Pref.Activities_planned) {
                b += "(status='Planned')"
            }
            if (Pref.Activities_held) {
                b += "(status='Held')"
            }
            if (Pref.Activities_not_held) {
                b += "(status='Not Held')"
            }
            Pref.ActivitiesWhere += "(" + b.replace(/\)\(/g, ")or(") + ")"
        }
        if (Pref.ActivitiesMine) {
            Pref.ActivitiesWhere += "(assigned_user_id = '" + CurrentUserId + "')"
        }
        Pref.ActivitiesWhere = Pref.ActivitiesWhere.replace(/\)\(/g, ")and(")
    }
}
QCRM.getModuleString = function(c, d, a)
{
    var b = a ? a : "";
    if (sugar_mod_strings && sugar_mod_strings[c] && sugar_mod_strings[c][d]) {
        b = sugar_mod_strings[c][d]
    }
    return b
};
function display_label(c, d, e)
{
    var a = sugar_mod_fields[c];
    if (a[d] === undefined) {
        return d
    }
    if ((a[d].type === "boolean") || (a[d].type === "bool")) {
        return ""
    }
    var b = a[d].label;
    b = sugar_mod_strings[c][b] || b;
    if (e) {
        b = '<span class="SugarLabel">' + b + "<span>"
    }
    return b
}
function display_value(c, g, a)
{
    var d = a[g].value, b = "Custom_" + c + "_" + g;
    if (sugar_mod_fields[c] === undefined) {
        return ""
    }
    var e = sugar_mod_fields[c][g];
    if (e === undefined || !SugarFields[e.type]) {
        return d
    } else {
        if (typeof e.display === "function") {
            return e.display(d, a)
        } else {
            if (typeof QCRM[b] === "function") {
                return QCRM[b](d, a)
            } else {
                return SugarFields[e.type].display(c, g, d, a)
            }
        }
    }
}
function display_default(a, c)
{
    if (sugar_mod_fields[a] === undefined) {
        return ""
    } else {
        if (sugar_mod_fields[a][c] === undefined) {
            return ""
        } else {
            if (c == "assigned_user_id") {
                return ""
            }
        }
    }
    var b = sugar_mod_fields[a][c];
    return b.def || ""
}
function address_values(r, c, g)
{
    var b = "", d = "", a = "+", n = getAddressValues(c, g, r), o = false, h = QCRM.addressTemplate, q = n.street, m = n.city, p = n.state, l = n.postalcode, e = n.country;
    if (QCRM.addressTemplate.indexOf("prefix") >= 0) {
        h = QCRM.addressTemplate.replace(/\$prefix/g, g + "_address");
        o = true
    }
    if (q !== "" || m !== "" || p !== "" || l !== "" || e !== "") {
        if (e === "") {
            e = JJWG.defCountry
        }
        if (o) {
            d = getFromTemplate(c, r, h)
        } else {
            d = QCRM.addressTemplate.replace("$street", q).replace("$postalcode", l).replace("$state", p).replace("$city", m).replace("$country", e).replace(/\\r/g, "").replace(/\\n/g, "<br>").replace(/\n/g, "<br>").replace(/<br>$/g, "").replace(/^<br>/g, "")
        }
        b = (q + a + m + a + (p !== "" ? (p + a) : "") + l).replace("<br>", " ").replace(/\n/g, a).replace(/&#039;/g, "'")
    }
    return {google: b, display: d}
}
function getAddressFields(d, c)
{
    var b, a = [];
    for (b in QCRM.addressFields) {
        a.push(d + "_address_" + QCRM.addressFields[b])
    }
    return a
}
function getAddressValues(b, l, a)
{
    var g, h = {}, m, c, d = QCRM.google_addressFields, e = ["street", "city", "state", "postalcode", "country"];
    for (g in d) {
        m = l + "_address_" + d[g];
        if (a[m]) {
            c = display_value(b, m, a)
        } else {
            c = ""
        }
        h[e[g]] = c
    }
    return h
}
function init_picker(c, e, l, d)
{
    var b = new Date(), h = l, g = {
        text: RES_CLEAR, handler: function(m, n)
        {
            $(c).val("");
            $(c).mobiscroll("cancel")
        }
    }, a = {
        preset: e,
        minDate: new Date(b.getFullYear() - 80, 0, 1),
        maxDate: new Date(b.getFullYear() + 20, 11, 31),
        theme: iOS ? "ios" : "android-holo-light",
        display: "modal",
        stepMinute: 5,
        lang: getMobiscrollLanguage()
    };
    a.buttons = ["cancel", "now", g, "set"];
    if (d) {
        $.extend(a, d)
    }
    $(c).mobiscroll(a);
    var h = l;
    if (l === false) {
        h = new Date();
        if (e === "datetime") {
            h.setMinutes(15 * Math.round(h.getMinutes() / 15))
        }
    }
    if (l !== "") {
        $(c).mobiscroll("setDate", h, (l !== false))
    }
    if (l === false) {
        $(c).val("")
    }
}
function updateDynamicEnum(a, g, h)
{
    var d = "Edit" + a + "_";
    h = d + h;
    if (document.getElementById(h) != null) {
        var b = document.getElementById(h), n = $("#" + d + g).val(), m;
        var e = [];
        for (var c = 0; c < b.length; c++) {
            if (b.options[c].selected) {
                e.push(b.options[c].value)
            }
        }
        if (de_entries[h] == null) {
            de_entries[h] = new Array;
            for (var c = 0; c < b.options.length; c++) {
                de_entries[h][b.options[c].value] = b.options[c].text
            }
        }
        document.getElementById(h).innerHTML = "";
        for (var l in de_entries[h]) {
            if (l.indexOf(n + "_") == 0) {
                if (!m) {
                    m = l
                }
                b.options[b.options.length] = new Option(de_entries[h][l], l)
            }
        }
        for (var l in e) {
            for (var c = 0; c < b.length; c++) {
                if (b.options[c].value == e[l]) {
                    b[c].selected = true;
                    m = e[l];
                    break
                }
            }
        }
        $("#" + h).selectmenu("refresh")
    }
}
function set_enum_val(a, b)
{
    $(a).val(b);
    $(a + " option").prop("selected", false);
    if (b === "") {
        b = "EMPTY"
    }
    $(a + " option[value='" + b + "']").prop("selected", true);
    $(a).selectmenu().selectmenu("refresh")
}
function set_multienum_val(a, b)
{
    $(a).val(b).selectmenu("refresh")
}
function set_bool_val(a, c, b)
{
    $(a + "0").prop("checked", !b).checkboxradio().checkboxradio("refresh");
    $(a + "1").prop("checked", b).checkboxradio().checkboxradio("refresh")
}
function init_dynamic_enum(b, d, a)
{
    if (d.parentenum !== undefined) {
        var c = d.parentenum;
        if (Beans[b].AdditionalFields.indexOf(c) !== -1) {
            updateDynamicEnum(b, c, a)
        }
    }
}
function init_form_field(c, b, h, d, e, u, n)
{
    var q = "", o = sugar_mod_fields[c][b], p = false, s = u + b, z = ((e[b] === undefined || d) ? false : e[b].value), w;
    if (!o) {
        return
    }
    if (SugarFields[o.type]) {
        p = SugarFields[o.type]
    }
    if (o.source === "non-db" && o.type !== "Drawing") {
        return
    }
    if (z === false && d && typeof o.default_value === "function") {
        z = o.default_value(n)
    }
    if (o.init_value) {
        o.init_value(d, e, u, n);
        return
    }
    if (p && p.init_value) {
        p.init_value(c, b, d, e, u, n);
        return
    }
    if (b === "user_sync") {
        if (d || (z === "0")) {
            $(s).val("0")
        } else {
            $(s).val("1")
        }
        return
    }
    if (b === "duration_hours") {
        if (d) {
            set_enum_val(s, "0")
        } else {
            set_enum_val(s, z)
        }
        return
    }
    if (b === "duration_minutes") {
        if (d) {
            set_enum_val(s, "15")
        } else {
            set_enum_val(s, z)
        }
        return
    }
    if (e.id && o.type === "Drawing") {
        SugarQuery("get_drawing", '{"session":"' + SugarSessionId + '","module_name":"' + c + '","id":"' + e.id.value + '","field":"' + b + '"}', function(C)
        {
            var A = false, B = null;
            if (C) {
                A = mobile_app && C.entry_list.hasDrawing;
                if (A) {
                    drawingInit("edit", c, s.replace(/#/g, ""), "data:image/png;base64," + C.entry_list.contents)
                }
            }
            if (!A) {
                drawingInit("edit", c, s.replace(/#/g, ""), "")
            }
        }, null);
        return
    }
    if (z === false) {
        if (o.type === "enum" || o.type === "dynamicenum") {
            w = o.def;
            if (o.def === undefined) {
                var m = sugar_app_list_strings[o.options];
                if (m[""] !== undefined) {
                    set_enum_val(s, "")
                } else {
                    for (var g in sugar_app_list_strings[o.options]) {
                        set_enum_val(s, g);
                        break
                    }
                }
            } else {
                set_enum_val(s, o.def)
            }
            init_dynamic_enum(c, o, b)
        } else {
            if (o.type === "relate" && Beans[o.module] === undefined) {
                if (SimpleBeans[o.module]) {
                    set_enum_val(s, SimpleBeans[o.module].DefValue)
                }
            } else {
                if (b === "assigned_user_name") {
                    $(u + "assigned_user_id").val(CurrentUserId);
                    $(s).val(CurrentUserName);
                    $(s + "L").html("")
                } else {
                    if (o.type === "relate") {
                        $(s).val("");
                        $(u + o.id_name).val("");
                        $(s + "L").html("")
                    } else {
                        if (o.type === "parent") {
                            $(s).val("");
                            $(u + o.id_name).val("");
                            set_enum_val(u + o.id_type, "Accounts")
                        } else {
                            if (o.type === "multienum") {
                                var v = 0, m = sugar_app_list_strings[o.options];
                                for (var a in m) {
                                    $(s + "_" + a.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, "")).prop("checked", false).checkboxradio().checkboxradio("refresh");
                                    v++
                                }
                            } else {
                                if (o.type === "date") {
                                    init_picker(s, "date", false)
                                } else {
                                    if (o.type === "datetime") {
                                        init_picker(s, "datetime", false)
                                    } else {
                                        if ((o.type === "bool" || o.type === "boolean")) {
                                            set_bool_val(s, b, false)
                                        } else {
                                            $(s).val((!d || (o.def === undefined)) ? "" : o.def);
                                            if ((o.type === "image" || o.type === "photo") && QCRM.imageFields[o.type]) {
                                                $(s + "D").val("0");
                                                $(s + "I").val("");
                                                $(s + "O").empty();
                                                show_upload(s, true)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        switch (o.type) {
            case"varchar":
            case"char":
            case"name":
            case"text":
                $(s).val(HTMLDecode(z.replace(/\\n/g, "\n").replace(/\\r/g, "\r")));
                break;
            case"datetime":
                init_picker(s, "datetime", (!z || z === "") ? false : fromDBDateTime(z));
                break;
            case"date":
                init_picker(s, "date", (!z || z === "") ? false : fromDBDate(z));
                break;
            case"enum":
            case"dynamicenum":
                set_enum_val(s, z);
                init_dynamic_enum(c, o, b);
                break;
            case"relate":
                if (Beans[o.module] === undefined) {
                    set_enum_val(s, e[o.id_name].value)
                } else {
                    $(s).val(z.replace(/&#039;/g, "'").replace(/\r/g, ""));
                    var r = "";
                    if (e[o.id_name]) {
                        r = e[o.id_name].value
                    }
                    $(u + o.id_name).val(r);
                    $(s + "L").html("")
                }
                break;
            case"parent":
                $(s).val(z.replace(/&#039;/g, "'"));
                if (e[o.id_type].value === "") {
                    e[o.id_type].value === "Accounts"
                }
                $(u + o.id_name).val(e[o.id_name].value);
                set_enum_val(u + o.id_type, e[o.id_type].value);
                break;
            case"multienum":
                var v = 0, m = sugar_app_list_strings[o.options], l;
                for (var a in m) {
                    if (a === "") {
                        if (z.length < 2) {
                            l = false
                        } else {
                            if (z.length === 2) {
                                l = true
                            } else {
                                l = (z.indexOf("^^^") >= 0)
                            }
                        }
                    } else {
                        l = (z.indexOf("^" + a + "^") >= 0)
                    }
                    $(s + "_" + a.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, "")).prop("checked", l).checkboxradio("refresh");
                    v++
                }
                break;
            case"bool":
            case"boolean":
                set_bool_val(s, b, (z === "1"));
                break;
            case"currency":
                if (z !== "") {
                    if (typeof z === "string") {
                        z = parseFloat(z)
                    }
                    $(s).val(z.toFixed(2))
                } else {
                    $(s).val(z)
                }
                break;
            case"image":
            case"photo":
                if (QCRM.imageFields[o.type]) {
                    $(s + "O").empty();
                    $(s + "I").val("");
                    $(s + "D").val("0");
                    show_upload(s, z == "")
                }
            default:
                $(s).val(z);
                break
        }
    }
    if (o.readonly && (o.type == "date" || o.type == "datetime")) {
        QCRM.SetFieldReadonly(c, b, true)
    } else {
        if (o.type == "text") {
            $(s).textinput("refresh")
        }
    }
}
QCRM.toDBField = function(c, n, e)
{
    var d, m = sugar_mod_fields[c][n], a = e + n;
    if (m === undefined) {
        return $(a).val()
    }
    if (m.toDBField !== undefined) {
        return m.toDBField(e)
    }
    switch (m.type) {
        case"bool":
        case"boolean":
            d = $(a + "div input:radio:checked").val();
            if (d === undefined) {
                if (Beans[c].CurrentId === "") {
                    d = "0"
                } else {
                    d = CurrentRecordValues[n].value
                }
            }
            return d;
            break;
        case"date":
        case"datetime":
            d = $(a).mobiscroll("getDate");
            if (d === null || $(a).val() === "") {
                return ""
            } else {
                if (m.type === "datetime") {
                    return toDBDateTime(d)
                } else {
                    return toDBDate(d)
                }
            }
            break;
        case"multienum":
            var h = 0, o = sugar_app_list_strings[m.options], l = "";
            for (var b in o) {
                if ($(e + n + "_" + b.replace(/\s+/g, "").replace(/\.+/g, "").replace(/\/+/g, "")).is(":checked")) {
                    l += (l === "" ? "" : ",") + "^" + b + "^"
                }
                h++
            }
            return l;
            break;
        case"relate":
            return $(a).val();
            break;
        case"float":
        case"decimal":
        case"currency":
        case"double":
            d = $(a).val();
            if (d === null || d === "") {
                return ""
            }
            try {
                d = document.getElementById(a.replace("#", "")).valueAsNumber;
                if (typeof d === "number" && !isNaN(d)) {
                    if (QCRM.OffLine) {
                        return d
                    }
                    return d.formatNumber(sig_digits, decimal_separator, "")
                }
            } catch (g) {
            }
            d = $(a).val();
            return d;
            break;
        default:
            d = $(a).val();
            if (d === null) {
                return ""
            } else {
                if (typeof d === "string") {
                    d = d.trim()
                }
            }
            return d;
            break
    }
};
function getEditField(b, d)
{
    var c = sugar_mod_fields[b][d], a = d;
    if (c === undefined) {
        return d
    }
    if (c.type === "relate" && Beans[c.module] === undefined) {
        a = c.id_name
    } else {
        if ((c.type === "relate" || c.type === "parent") && $("#Edit" + b + "_" + c.id_name).val() !== undefined) {
            a = c.id_name
        }
    }
    return "#Edit" + b + "_" + a
}
function checkFormField(b, e, d)
{
    var c = sugar_mod_fields[b][e], h = "", g = $(d + e).val();
    if (g && typeof g === "string") {
        g = g.trim()
    }
    if (c !== undefined) {
        var a = sugar_mod_strings[b][c.label];
        if (c.req && c.type === "multienum") {
        } else {
            if (c.req && c.type === "parent") {
                if ($(d + c.id_name).val() === "") {
                    h = ": " + RES_REQUIRED_MSG
                }
            } else {
                if (c.req && c.type === "Drawing") {
                } else {
                    if (c.req && (g === "" || g === "EMPTY")) {
                        h = ": " + RES_REQUIRED_MSG
                    } else {
                        if ((c.type === "date") && !checkDateString(g)) {
                            h = ": " + RES_INV_DATE_MSG
                        } else {
                            if ((c.type === "datetime") && !checkDateTimeString(g)) {
                                h = ": " + RES_INV_DATETIME_MSG
                            } else {
                                if ((c.type === "email") && !check_email(g)) {
                                    h = RES_INVALID_EMAIL_MSG
                                } else {
                                    if (((c.type === "relate" && Beans[c.module] !== undefined) || c.type === "parent") && g !== "") {
                                        if ($(d + c.id_name).val() === "") {
                                            h = " - " + RES_UNDEFINED_FIELD + " " + g
                                        }
                                    } else {
                                        if (e === "duration_hours") {
                                            if (g === "0" && $(d + "duration_minutes").val() === "0") {
                                                return RES_DURATION_LABEL + ": " + RES_REQUIRED_MSG
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (h !== "") {
            a = a === undefined ? e : a.replace("&#039;", "'");
            return a + h
        }
    }
    return ""
}
function check_email(a)
{
    if (a === "") {
        return (true)
    }
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/.test(a))
}
function getRelatedList(d, o)
{
    var e = Beans[d].CurrentId, b = Beans[d], p = Beans[d].Links[o], c = p.module, s = (Beans[c] === undefined ? SimpleBeans[c] : Beans[c]), q = "#" + d + "DP" + o + "Ul";
    if (s.Enabled()) {
        $(q).empty();
        if (p.display !== undefined) {
            p.display(e);
            return
        }
        var r = (s !== undefined) && (mobile_app || mobile_edition == "Pro") && p.select && (["Calls", "Meetings", "Tasks", "Notes", "Emails"].indexOf(c) === -1), v = (Beans[c] !== undefined) && (mobile_edition == "Pro" || Beans[c].available_CE) && s.access === "edit" && p.create, u, g, n, a = sugar_app_list_strings.moduleList[c];
        if (b.CustomLinks && b.CustomLinks[o] && b.CustomLinks[o].title !== undefined) {
            var h = b.CustomLinks[o].title;
            if (sugar_mod_strings[d][h] !== undefined) {
                a = sugar_mod_strings[d][h]
            } else {
                if (h !== p.module) {
                    a = h
                }
            }
        }
        if (r || v) {
            u = $("<li data-icon='" + (r ? "search" : "plus") + "'" + ((v && r) ? " data-split-theme='b' class='ui-nodisc-icon'" : "") + " data-theme='b'/>");
            if (v) {
                g = $("<a/>", {
                    href: "#", click: function()
                    {
                        Beans[c].Create(d, o)
                    }
                });
                g.append(a + (r ? '<span style="font-weight:bold;font-size:larger;float:right;">+</span>' : ""));
                u.append(g)
            }
            if (r) {
                n = $("<a/>", {
                    href: "javascript:void(0)",
                    "data-icon": "search",
                    "data-link": "add-rel",
                    "data-mod": c,
                    "data-frommod": d,
                    "data-fromid": e,
                    "data-fromlnk": o,
                    "data-filter": (p.filter && CurrentRecordValues[p.filter.value_field] && CurrentRecordValues[p.filter.value_field] !== "") ? (p.filter.field + " LIKE '" + CurrentRecordValues[p.filter.value_field].value + "'") : ""
                });
                if (!v) {
                    n.append(a)
                }
                u.append(n)
            }
        } else {
            u = $("<li data-theme='b' data-icon='false'/>");
            u.append('<a href="javascript:void(0)">' + a + "</a>")
        }
        $(q).append(u);
        var m = s.DisplaySubpanelFilter(), l = ShowRelatedBeansList;
        if (QCRM.ServerVersion >= "4.6" && c !== "Emails") {
            l = ShowRelatedBeansList2
        }
        if (Beans[c] !== undefined && Pref.FilterOldDate !== "" && Pref.FilterOld.indexOf(c) !== -1) {
            m += (m === "" ? "" : " AND ") + "date_entered>'" + Pref.FilterOldDate + "'"
        }
        if (p.where) {
            m += (m === "" ? "" : " AND ") + p.where
        }
        l(d, c, e, o, m, s.OrderBy, q.replace("#", ""), 0, RowsPerSubPanel, Pref.HideEmptySubP && !v && !r)
    }
}
function ShowRelatedBeansList(o, r, q, B, m, l, d, e, h, n)
{
    var a = (Beans[r] === undefined ? SimpleBeans[r] : Beans[r]), C = $("#" + d), z, w, u = Beans[o].Links[B], b = getNavButtons(d), p = a.OrderBy.split(" "), c, g = p[0], A = (p[1] === undefined || p[1] === "asc") ? 1 : -1;

    function v(D, F)
    {
        try {
            return (parseFloat(D.name_value_list[g].value) > parseFloat(F.name_value_list[g].value)) ? A : -A
        } catch (E) {
            return D.name_value_list[g] ? A : -A
        }
    }

    function s(D, F)
    {
        try {
            return (D.name_value_list[g].value.toUpperCase() > F.name_value_list[g].value.toUpperCase()) ? A : -A
        } catch (E) {
            return D.name_value_list[g] ? A : -A
        }
    }

    C.hide();
    $("#" + d + " li:gt(0)").remove();
    QCRM.get_relationships(o, r, q, B, m, a.ListFieldsToSelect([g, "id"]), "", "", 0, false, function(K)
    {
        if (K && K.entry_list != undefined) {
            if (K.entry_list.length > e) {
                if (g !== "" && Beans[r] !== undefined) {
                    c = sugar_mod_fields[r][g].type;
                    if (c === "currency" || c === "int" || c === "decimal" || c === "float" || c === "double") {
                        K.entry_list.sort(v)
                    } else {
                        K.entry_list.sort(s)
                    }
                }
                var H = e, F = K.entry_list.length, E = e + h, I, L;
                if (E > F) {
                    E = F
                }
                for (H; H < E; H++) {
                    var J = K.entry_list[H], D, G;
                    if (Beans[r] !== undefined) {
                        if (r == "Documents" && sugar_version < "6.3") {
                            $.extend(K.entry_list[H].name_value_list, Beans[r].get_file_info(K.entry_list[H].name_value_list.document_name.value.replace(" ", "_")))
                        }
                        G = Beans[r].DisplaySubpanelRecord(J.id, J.name_value_list, o + (Beans[o].fullPage ? "DP" : "ListPage"), o, B)
                    } else {
                        G = $("<li/>");
                        D = SimpleBeans[r].DisplaySubpanelElt(J.name_value_list);
                        G.append(D)
                    }
                    C.append(G)
                }
                if (F > h) {
                    L = e - h;
                    if (L < 0) {
                        L = 0
                    }
                    I = e + h;
                    C.append($("<li/>").append(b));
                    $("#" + d + "L").unbind("click");
                    $("#" + d + "L").click({offset: L}, function(M)
                    {
                        ShowRelatedBeansList(o, r, q, B, m, l, d, M.data.offset, h, false)
                    });
                    $("#" + d + "R").unbind("click");
                    $("#" + d + "R").click({offset: I}, function(M)
                    {
                        ShowRelatedBeansList(o, r, q, B, m, l, d, M.data.offset, h, false)
                    });
                    enableButton(d + "L", e !== 0);
                    enableButton(d + "R", F > I)
                }
                C.listview().listview("refresh");
                if (mobile_app) {
                }
                C.show()
            } else {
                if (!n) {
                    C.listview().listview("refresh");
                    C.show()
                }
            }
        } else {
            C.listview("refresh")
        }
    })
}
function ShowRelatedBeansList2(o, r, q, z, m, l, d, e, h, n)
{
    var a = (Beans[r] === undefined ? SimpleBeans[r] : Beans[r]), A = $("#" + d), v, u, s = Beans[o].Links[z], b = getNavButtons(d), p = a.OrderBy.split(" "), c, g = p[0], w = (p[1] === undefined || p[1] === "asc") ? 1 : -1;
    A.hide();
    $("#" + d + " li:gt(0)").remove();
    QCRM.get_relationships(o, r, q, z, m, a.ListFieldsToSelect([g, "id"]), "", a.OrderBy, e, h, function(I)
    {
        if (I && I.entry_list != undefined) {
            if (I.entry_list.length > 0) {
                var F = 0, D = I.entry_list.length, G, J = 0, C = I.total_count;
                for (F; F < D; F++) {
                    var H = I.entry_list[F], B, E;
                    if (Beans[r] !== undefined) {
                        if (r == "Documents" && sugar_version < "6.3") {
                            $.extend(I.entry_list[F].name_value_list, Beans[r].get_file_info(I.entry_list[F].name_value_list.document_name.value.replace(" ", "_")))
                        }
                        E = Beans[r].DisplaySubpanelRecord(H.id, H.name_value_list, o + (Beans[o].fullPage ? "DP" : "ListPage"), o, z)
                    } else {
                        E = $("<li/>");
                        B = SimpleBeans[r].DisplaySubpanelElt(H.name_value_list);
                        E.append(B)
                    }
                    A.append(E)
                }
                if (C > h) {
                    J = e - h;
                    if (J < 0) {
                        J = 0
                    }
                    G = e + h;
                    A.append($("<li/>").append(b));
                    $("#" + d + "L").unbind("click");
                    if (e > 0) {
                        $("#" + d + "L").click({offset: J}, function(K)
                        {
                            ShowRelatedBeansList2(o, r, q, z, m, l, d, K.data.offset, h, false)
                        })
                    }
                    $("#" + d + "R").unbind("click");
                    if (G < C) {
                        $("#" + d + "R").click({offset: G}, function(K)
                        {
                            ShowRelatedBeansList2(o, r, q, z, m, l, d, K.data.offset, h, false)
                        })
                    }
                    enableButton(d + "L", e !== 0);
                    enableButton(d + "R", G < C)
                }
                A.listview().listview("refresh");
                if (mobile_app) {
                }
                A.show()
            } else {
                if (!n) {
                    A.listview().listview("refresh");
                    A.show()
                }
            }
        } else {
            A.listview("refresh")
        }
    })
}
$("#InlineEdit").on("pagecreate", function()
{
    $("#IECancel").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
    $("#IESave").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL);
    $("#IESaved").text(sugar_app_strings.LBL_SAVED)
});
function IESetNewval(c, a, g)
{
    var l = $("#IESaved"), e, b = {}, n = false, m = (c !== undefined), d = false, h = false;
    if (!m) {
        c = $("#IEModule").val();
        g = $("#IEFields").val().split(",");
        a = $("#IEId").val();
        e = "#IE_";
        l = $("#IESaved")
    } else {
        e = "#IE_" + c + g[0];
        l = $("#SdIE_" + c + g[0])
    }
    $.each(g, function(p, s)
    {
        var q = checkFormField(c, s, e), r = sugar_mod_fields[c][s];
        if (q !== "") {
            n = q
        } else {
            if (r && r.type === "Drawing") {
                d = s;
                $(e + s + "_canvas").jqScribble.save(null);
                h = $(e + s + "_delete").val() === "1" && $(e + s).val() === ""
            }
            addEnteredVal(b, c, s, e)
        }
    });
    if (n) {
        l.html(n);
        l.show();
        setTimeout(function()
        {
            l.hide()
        }, 3000);
        return
    }
    if (d && (b[d].value !== "" || h)) {
        var o = {
            session: SugarSessionId,
            module_name: c,
            id: a,
            field: d,
            drawing: h ? "" : b[d].value,
            deleted: h ? 1 : 0
        };
        SugarQuery("set_drawing", JSON.stringify(o), function(p)
        {
            Beans[c].ViewDetails()
        }, null)
    } else {
        $.mobile.loading("show");
        QCRM.set_entry(c, a, b, function(p)
        {
            var w = sugar_app_strings.LBL_SAVED, q = false, s, v = Beans[c], r = false;
            if (!p || p.id === undefined) {
                q = true;
                var w = "Save Error. Please check your server log";
                $.mobile.loading("hide");
                if (p && p.name !== undefined) {
                    if (p.name === "Access Denied") {
                        w = RES_ACCESS_DENIED_MSG
                    } else {
                        w = p.name
                    }
                }
            } else {
                $.each(g, function(A, C)
                {
                    var B = sugar_mod_fields[c][C], z;
                    if (B.after_save) {
                        z = B.after_save(p.id, b);
                        r = z || r
                    }
                });
                try {
                    v.AfterSave(a, false, b);
                    for (s in v.hooks.after_save) {
                        v.hooks.after_save[s](a, false, b)
                    }
                } catch (u) {
                }
            }
            if (q) {
                $.mobile.loading("hide");
                l.text(w);
                l.show();
                setTimeout(function()
                {
                    l.hide()
                }, 3000)
            } else {
                if (!m) {
                    setTimeout(function()
                    {
                        $.mobile.loading("hide")
                    }, 50)
                } else {
                    setTimeout(function()
                    {
                        $.mobile.loading("hide");
                        Beans[c].ViewDetails()
                    }, r ? 8000 : 50)
                }
            }
        })
    }
}
function IECancel()
{
    $(".inlineEditActive").html(QCRM.IEsavedContents);
    try {
        $(".inlineEditActive").css("padding", "0px");
        $(".inlineEditActive").blur()
    } catch (a) {
    }
    $(".inlineEditActive").removeClass("inlineEditActive");
    QCRM.IEsavedContents = ""
}
function handleTapHold(o, p, c, m, a, r, l)
{
    var b = "#IENew", g, h = "IE_", e, n = Beans[c].EditExcluded, q = sugar_mod_fields[c], d = [];
    p.preventDefault();
    if (l === "inline") {
        if (QCRM.IEsavedContents !== "") {
            return
        }
        g = $(o);
        h += c + m[0]
    } else {
        g = $("#IENew")
    }
    if (mobile_edition === "Pro") {
        if (Beans[c].CheckEdit(r)) {
            $.each(m, function(s, v)
            {
                var u = q[v];
                if (u && n.indexOf(v) === -1) {
                    if ((u.type !== "readonly") && (u.type !== "file") && (u.readonly === undefined || u.readonly === false) && ((u.type !== "Drawing") || !QCRM.OffLine)) {
                        if (QCRM.LockSetDrawing && u.type !== "Drawing" && $("#" + h + v + "HD").val() === "1") {
                            return
                        }
                        d.push(v)
                    }
                }
            });
            if (d.length === 0) {
                return
            }
            QCRM.IEsavedContents = g.html();
            g.addClass("inlineEditActive");
            AttachTo = "";
            g.empty();
            init_add_form(c, d, [], g, h);
            if (l === "inline") {
                g.append('<form><input type="button" class="ui-alt-icon ui-nodisc-icon" id="C' + h + '"  data-icon="delete" data-iconpos="notext" data-inline="true" data-theme="a" style="margin-right:40px"><input id="S' + h + '" type="button" data-inline="true" data-icon="check" data-iconpos="notext" data-theme="b"><span id="Sd' + h + '" style="color:red;display:none;"></span></form>');
                g.find('[type="button"]').button();
                if (QCRM.DrawingSignature) {
                    $(".drawing_nosign").hide()
                }
                e = q[m[0]];
                $(document).one("click", "#C" + h, function(s)
                {
                    IECancel()
                });
                $("#S" + h).click(function()
                {
                    $(this).parent().hide();
                    IESetNewval(c, a, m)
                })
            }
            g.find("textarea").textinput();
            g.find('[type="text"]').textinput();
            g.find('[type="number"]').textinput();
            g.find('[type="tel"]').textinput();
            g.find('[type="email"]').textinput();
            g.find("select").selectmenu();
            g.find("[data-role=controlgroup]").controlgroup().trigger("create");
            g.find('[type="radio"]').checkboxradio();
            $.each(d, function(s, u)
            {
                init_form_field(c, u, "", false, r, "#" + h, "")
            });
            if (l !== "inline") {
                $("#IEModule").val(c);
                $("#IEFields").val(m.join(","));
                $("#IEId").val(a);
                setTimeout(function()
                {
                    $("#IE" + c).click()
                }, 50)
            } else {
                g.parent().listview("refresh");
                if (e.type === "Drawing") {
                    $("html, body").animate({scrollTop: g.offset().top}, 100)
                } else {
                    if (e.type !== "datetime" && e.type !== "date") {
                        $(":input:enabled:visible:not([readonly]):first").focus()
                    } else {
                        $("#" + h + m[0]).mobiscroll("show")
                    }
                }
            }
        }
    } else {
        AlertPopup(RES_UNAVAILABLE)
    }
}
function addInlineEdit(b, a, g, c, e, d)
{
    e.off("taphold");
    e.on("taphold", function(h)
    {
        handleTapHold(this, h, b, a, g, c, d);
        return false
    })
}
function displayFields(g, c, h, a)
{
    var b = Beans[c].DetailExcluded;
    for (var l in h) {
        var e = h[l], d = sugar_mod_fields[c][e];
        if (d && d.type && SugarFields[d.type] && b.indexOf(e) == -1) {
            SugarFields[d.type].addFieldContainer(a, c, e, g)
        }
    }
}
function SaveNote()
{
    var d = Beans.Notes, b = (d.CurrentId === ""), g = d.AllEditFields(), c = $("#NotesFromLnk").val(), a = $("#NotesFromModule").val();
    if (CheckAllFields("Notes", g) > 0) {
        return
    }
    $.mobile.loading("show");
    var o = Beans.Notes.EditValues("#EditNotes_"), h = {};
    var e = "", m = "", l = "";
    if (b) {
        var n = "";
        if (a === "Contacts" && Beans.Contacts.CurrentId !== "" && Beans.Contacts.CurrentParentId !== "") {
            n = Beans.Contacts.CurrentParentId
        } else {
            if (a === "Accounts" && Beans.Accounts.CurrentId !== "") {
                n = Beans.Accounts.CurrentId
            }
        }
        if (n !== "") {
            e = "Accounts";
            m = n
        } else {
            if (a !== "Contacts" && a !== "" && Beans[a] !== undefined && Beans[a].CurrentId !== "") {
                e = a;
                m = Beans[a].CurrentId
            }
        }
        if (e !== "") {
            o.parent_type = {name: "parent_type", value: e};
            o.parent_id = {name: "parent_id", value: m}
        }
        if (a === "Contacts" && Beans.Contacts.CurrentId !== "") {
            o.contact_id = {name: "contact_id", value: Beans.Contacts.CurrentId};
            l = Beans.Contacts.CurrentId
        }
    } else {
    }
    if ($("#DelAttach").val() == "1") {
        o.file_mime_type = {name: "file_mime_type", value: ""};
        o.filename = {name: "filename", value: ""}
    }
    QCRM.set_entry("Notes", Beans.Notes.CurrentId, o, function(q)
    {
        var u;
        if ((q.name !== undefined) && (q.name === "Access Denied")) {
            AlertPopup(RES_ACCESS_DENIED_MSG);
            return
        }
        var p = d.AllEditFields(), s = false;
        for (var u in p) {
            var w = p[u], v = sugar_mod_fields.Notes[w], r;
            if (v.after_save) {
                r = v.after_save(q.id, o);
                s = r || s
            }
        }
        if (Beans.Notes.CurrentId === "") {
            if (e !== "") {
                QCRM.set_relationship(e, m, c, q.id)
            }
            if (l !== "") {
                QCRM.set_relationship("Contacts", l, "notes", q.id)
            }
        }
        d.AfterSave(q.id, b, o);
        for (u in d.hooks.after_save) {
            d.hooks.after_save[u](q.id, b, o)
        }
        if ($("#DelAttach").val() != "1" && Beans.Notes.TmpFile.name !== "") {
            s = true;
            QCRM.set_note_attachment(Beans.Notes.TmpFile.contents, Beans.Notes.TmpFile.mime_type, Beans.Notes.TmpFile.name, q.id, e, m, function(z)
            {
            })
        }
        setTimeout(function()
        {
            Beans.Notes.TmpFile = EmptyFile;
            Beans.Notes.AfterSaveLandingPage(q.id, Beans.Notes.CurrentId === "")
        }, s ? 6000 : 200)
    })
}
function createLink(a, b)
{
    return $("<a/>", {href: "#", "data-identity": b, "data-module": a, "data-link": "bean"})
}
function createEditLink(a, c, b)
{
    return '<a data-role="button" data-link="editlist" data-icon="edit" data-identity="' + c + '" data-module="' + a + '" class="' + (b == true ? "" : "ui-alt-icon ") + 'ui-nodisc-icon"/>'
}
function getCalendarLink(g, d)
{
    var c = fromDBDateTime(d.date_start.value), a = $("<a/>", {
        href: "#",
        "data-link": "nativecal",
        "data-date": d.date_start.value,
        "class": "nativeSIcon"
    }), b = "<h4>" + d.name.value + "</h4><p>" + jQuery.mobiscroll.formatDate(datetime_format, c) + " - &shy;" + jQuery.mobiscroll.formatDate(datetime_format, fromDBDateTime(d.date_end.value)) + "</p>";
    var e = $('<li data-icon="false"/>');
    a.css({"padding-left": "30px"});
    a.append(b);
    e.append(a);
    return e
}
$(document).on("click", '[data-link="search"]', function(b)
{
    var a = $(this).closest("form").data("module");
    SaveLastSearch(a);
    StartSearch(a);
    return false
});
$(document).on("click", '[data-link="clearsearch"]', function(a)
{
    clearSearchValues($(this).closest("form").data("module"));
    return false
});
$(document).on("click", '[data-link="create"]', function(a)
{
    Beans[$(this).closest("ul").data("module")].Create();
    return false
});
$(document).on("click", '[data-link="createcurrent"]', function()
{
    var a = $("body").pagecontainer("getActivePage");
    Beans[a.data("module")].Create();
    return false
});
$(document).on("tap", '[data-link="previous"]', function(b)
{
    var c = $(this), a = c.closest("ul").data("module");
    c.removeClass("ui-btn-active");
    c.removeClass("ui-btn-up-d");
    Beans[a].GetList(Beans[a].PrevOffset);
    return false
});
$(document).on("tap", '[data-link="next"]', function(b)
{
    var c = $(this), a = c.closest("ul").data("module");
    c.removeClass("ui-btn-active");
    c.removeClass("ui-btn-up-d");
    Beans[a].GetList(Beans[a].NextOffset);
    return false
});
$(document).on("click", '[data-link="edit"]', function()
{
    Beans[$(this).closest("ul").data("module")].Update("", $("body").pagecontainer("getActivePage").attr("id"));
    return false
});
$(document).on("click", '[data-link="editcurrent"]', function()
{
    var a = $("body").pagecontainer("getActivePage");
    Beans[a.data("module")].Update("", a.attr("id"));
    return false
});
$(document).on("click", '[data-link="dupcurrent"]', function()
{
    var b = $("body").pagecontainer("getActivePage"), a = Beans[b.data("module")];
    a.Duplicate(a.CurrentId);
    return false
});
$(document).on("click", '[data-link="delcurrent"]', function()
{
    var a = $("body").pagecontainer("getActivePage"), b = a.data("module");
    SugarCrmDelete(b, Beans[b].CurrentId, b + "ListPage");
    return false
});
$(document).on("click", '[data-link="editlist"]', function()
{
    var a = $(this);
    Beans[a.data("module")].Update(a.data("identity"), "HomePage");
    return false
});
$(document).on("click", '[data-link="delete"]', function(b)
{
    var a = $(this).closest("ul").data("module");
    SugarCrmDelete(a, Beans[a].CurrentId, a + "ListPage");
    return false
});
$(document).on("tap", '[data-link="back"]', function(b)
{
    var a = QCRM.History.pop();
    if (a == ("#" + $("body").pagecontainer("getActivePage").attr("id"))) {
        a = QCRM.History.pop()
    }
    $("body").pagecontainer("change", a, {reverse: true});
    return false
});
$(document).on("tap", '[data-link="CSback"]', function(a)
{
    $("#CSCancelBtn").click()
});
$(document).on("click", '[data-link="save"]', function()
{
    var a = $(this);
    a.addClass("ui-disabled");
    setTimeout(function()
    {
        a.removeClass("ui-disabled")
    }, 2000);
    Beans[a.closest("div").data("module")].Save();
    return false
});
$(document).on("click", '[data-link="editbtn"]', function()
{
    $(this).closest("li").taphold();
    return false
});
$(document).on("click", '[data-link="add-rel"]', function()
{
    var a = $(this);
    $("#CSSearchTextL").empty();
    OpenSelect(a.data("mod"), a.data("frommod"), a.data("fromid"), a.data("fromlnk"), a.data("filter"));
    setTimeout('$("#' + a.data("frommod") + 'CS").click();', 150);
    return false
});
$(document).on("click", '[data-link="nativecal"]', function(a)
{
    window.plugins.calendar.openCalendar(fromDBDateTime($(this).data("date")));
    return false
});
$(document).on("click", '[data-link="html"]', function(b)
{
    var a = "<html><body>" + $(this).html() + "</body></html>";
    b.preventDefault();
    SaveFile(a, "temp.html", "temp", "text/html", true, function(d, e, c)
    {
        OpenURL(d, c)
    }, function(c)
    {
    });
    return false
});
$(document).on("click", '[data-link="phone"]', function(z)
{
    var w = $(this), b = w.data("module"), s = w.data("identity"), h = w.data("account"), o = w.data("page"), a = w.data("new"), e = decodeObject(w.data("phone")), n = $(o + "L");
    z.preventDefault();
    $(o + "L li").remove();
    for (var p in e) {
        var v = e[p], B = v.module, d = v.id, A = v.name;
        n.append($('<li data-theme="a"/>').append("<h4>" + A + "</h4>"));
        for (var q = 0; q < v.records.length; q++) {
            var u, c = v.records[q], g = b, m = s;
            if (d) {
                m = d;
                g = B
            }
            u = SugarFields.phone.link_button(o, c.phone, c.type, g, m, B, d, v.name, h, a);
            n.append($("<li " + QCRM.PhoneStyle + ' data-icon="phone"/>').append(u))
        }
    }
    n.listview("refresh");
    setTimeout(function()
    {
        $(o).popup("open", {positionTo: w})
    }, 50);
    return false
});
$(document).on("click", '[data-link="attach"]', function()
{
    var b = $(this);

    function a()
    {
        var c = QCRM.OpenDownloadLink || OpenDownloadLink;
        c(b.data("module"), b.data("identity"), decodeObject(b.data("fileinfo")), b.data("external"))
    }

    a();
    return false
});
$(document).on("click", '[data-link="zoom"]', function(b)
{
    var a = $(this).html();
    if (mobile_app) {
    }
    return false
});
$(document).on("click", '[data-link="favorite"]', function()
{
    var b = $(this), c = $("body").pagecontainer("getActivePage"), e = c.data("module"), g = Beans[e].CurrentId, d = b.data("name"), a = b.data("favorite");
    a = !a;
    if (a) {
        PushFavorites(e, g, d)
    } else {
        RemoveFromFavorites(e, g)
    }
    showFavoriteStatus(e, g, d);
    return false
});
$(document).on("tap", '[data-link="bean"]', function()
{
    var c = $(this), e = c.data("module"), b = Beans[e], h = c.data("identity"), d = $("body").pagecontainer("getActivePage").attr("id"), a = !b.fullPage, g = ((d == e + "ListPage" && a) || d == e + "DP");
    b.CurrentId = c.data("identity");
    if (a) {
        c.addClass("listselected");
        if (!iOS) {
            if (document.activeElement) {
                document.activeElement.blur()
            }
        }
    }
    if (g) {
        b.ViewDetails()
    } else {
        $("body").pagecontainer("change", "#" + e + (a ? "ListPage" : "DP"))
    }
    return false
});
$(document).on("change", '[data-link="list"]', function(d)
{
    var c, g = $(this), a = g.closest("td"), b = a.data("module"), h = QCRM.moduleMenu[b] || QCRM.moduleMenu.all, e = h[g.val()];
    d.stopPropagation();
    if (e) {
        if (!e.disabled(a.data())) {
            e.action(a.data());
            g.val("EMPTY")
        }
    }
    return false
});
function AddLinkWithIcon(c, r, q, D, v, g, h, s, a)
{
    var B = getPhoneValues(D, v, c), d = Beans[c] || SimpleBeans[c], m = (c === "Notes" ? "filename" : (c === "Documents" ? (D.filename ? "filename" : "document_name") : false)), w = m && D[m] && D[m].value && D[m].value.match(QCRM.ExtWhiteList), z = ((B.length > 0) && (!QCRM.CallAssignedOnly || D.assigned_user_id.value === CurrentUserId)), u = d.CustomListStyle(D, h), A = c === "SugarFeed" ? {} : {
        href: "javascript:void(0)",
        style: "text-shadow:none !important;padding-top:4px;padding-bottom:6px;" + u,
        "data-from": s,
        "data-link": "bean",
        "data-module": c,
        "data-identity": r
    }, e = c === "SugarFeed" ? {} : {
        "data-module": c,
        "data-from": s,
        "data-identity": r,
        "data-type": (a ? Beans[s].Links[a].swipeType : d.swipeType)
    }, n = (q === "") ? d.DisplaySubpanelElt(D) : q, C, p;
    if (a) {
        e["data-relationship"] = a
    }
    if (D.edit_access == undefined) {
        D.edit_access = true
    } else {
        if (typeof(D.edit_access) == "object") {
            D.edit_access = D.edit_access.value
        }
    }
    if (D.delete_access == undefined) {
        D.delete_access = D.edit_access
    } else {
        if (typeof(D.delete_access) == "object") {
            D.delete_access = D.delete_access.value
        }
    }
    e["data-edit"] = D.edit_access ? "1" : "0";
    e["data-del"] = D.delete_access ? "1" : "0";
    if (z) {
        e["data-icon"] = "phone"
    } else {
        if (w) {
            e["data-icon"] = "paperclip"
        }
    }
    if (z || w) {
        e["data-split-theme"] = "c"
    } else {
        e["data-icon"] = "false"
    }
    if (d.ListData) {
        $.extend(e, d.ListData(D))
    }
    p = $("<li/>", e);
    C = $(c === "SugarFeed" ? "<span/>" : "<a/>", A);
    g = "#Phone" + g;
    if (h) {
        C.addClass(c + "SIcon");
        C.css({"padding-left": "25px"})
    }
    C.append(n);
    p.append(C);
    if (z) {
        if (u !== "") {
            u = Beans[c].CustomListStyle(D, false);
            if (u === "") {
                u = "background:#eee;"
            }
        } else {
            if (h) {
                u = "background:#eee;"
            }
        }
        var b = (c !== "Calls" || (D.status && D.status.value === "Held")), l = "", o;
        if (g === "#PhoneAccountsDP") {
            l = Beans.Accounts.CurrentId
        } else {
            if (D.account_id) {
                l = D.account_id.value
            }
        }
        o = $("<a/>", {
            href: "#",
            "class": "ui-alt-icon ui-nodisc-icon",
            "data-theme": "c",
            "data-rel": "popup",
            "data-link": "phone",
            "data-page": g,
            "data-module": c,
            "data-identity": r,
            "data-account": l,
            "data-new": b ? "true" : "false",
            "data-phone": encodeObject(B),
            style: u
        });
        p.append(o)
    } else {
        if (w) {
            p.append(CreateDownloadLink(c, r, D, u))
        }
    }
    return p
}
function AddLinkTablet(d, b, e)
{
    var m = Beans[d], c = {
        href: "javascript:void(0)",
        "data-link": "bean",
        "data-icon": "false",
        "data-module": d,
        "data-identity": b,
        style: "text-shadow:none !important;padding-top:2px;padding-bottom:3px;padding-left:30px !important;" + m.CustomListStyle(e, false)
    }, h = {"data-module": d, "data-identity": b, "data-type": m.swipeType}, g = m.DisplaySubpanelElt(e), a, l;
    l = $("<li/>", h);
    a = $("<a/>", c);
    a.append(g);
    l.append(a);
    return l
}
function SugarCrmDelete(a, d, b, c)
{
    if (mobile_edition == "Pro" || Beans[a].available_CE) {
        if (Beans[a].CheckDelete(CurrentRecordValues)) {
            ConfirmPopup(sugar_app_strings.NTC_DELETE_CONFIRMATION, function()
            {
                $.mobile.loading("hide");
                QCRM.delete_entry(a, d, function(g)
                {
                    var e, h = Beans[a], m = $("body").pagecontainer("getActivePage").attr("id");
                    if (g && g.name !== undefined) {
                        var l = g.name;
                        if (l === "Access Denied") {
                            l = RES_ACCESS_DENIED_MSG
                        }
                        AlertPopup(l);
                        return
                    }
                    h.CurrentId = "";
                    if (b && m != b) {
                        $("body").pagecontainer("change", "#" + b, {reverse: false, changeHash: false})
                    } else {
                        if (m === "HomePage") {
                            displayDashlets()
                        } else {
                            $("body").pagecontainer("getActivePage").trigger("pageshow")
                        }
                    }
                    h.AfterDelete(d);
                    for (e in h.hooks.after_delete) {
                        h.hooks.after_delete[e](d)
                    }
                    RemoveFromLastviewed(a, d);
                    RemoveFromFavorites(a, d);
                    if (c) {
                        c(true)
                    }
                })
            }, "#HomePage")
        }
    } else {
        AlertPopup(RES_UNAVAILABLE)
    }
}
function setCookie(a, d, b)
{
    if (mobile_app) {
        localStorage.setItem(a, d);
        return
    }
    var e = new Date();
    e.setDate(e.getDate() + b);
    var c = escape(d) + ((b === null) ? "" : "; expires=" + e.toUTCString());
    document.cookie = a + "=" + c
}
function getCookie(b)
{
    if (mobile_app) {
        var d = localStorage.getItem(b);
        if (d === 0) {
            d = "0"
        } else {
            if (d === 1) {
                d = "1"
            }
        }
        return d
    }
    var c, a, g, e = document.cookie.split(";");
    for (c = 0; c < e.length; c++) {
        a = e[c].substr(0, e[c].indexOf("="));
        g = e[c].substr(e[c].indexOf("=") + 1);
        a = a.replace(/^\s+|\s+$/g, "");
        if (a == b) {
            return unescape(g)
        }
    }
    return ""
}
(function(l)
{
    var q = function(c, a)
    {
        var m, r, d, e, b;
        d = c & 2147483648;
        e = a & 2147483648;
        m = c & 1073741824;
        r = a & 1073741824;
        b = (c & 1073741823) + (a & 1073741823);
        if (m & r) {
            return b ^ 2147483648 ^ d ^ e
        }
        return m | r ? b & 1073741824 ? b ^ 3221225472 ^ d ^ e : b ^ 1073741824 ^ d ^ e : b ^ d ^ e
    }, h = function(c, a, m, r, d, e, b)
    {
        c = q(c, q(q(a & m | ~a & r, d), b));
        return q(c << e | c >>> 32 - e, a)
    }, p = function(c, a, m, r, d, e, b)
    {
        c = q(c, q(q(a & r | m & ~r, d), b));
        return q(c << e | c >>> 32 - e, a)
    }, n = function(c, a, m, r, d, e, b)
    {
        c = q(c, q(q(a ^ m ^ r, d), b));
        return q(c << e | c >>> 32 - e, a)
    }, o = function(c, a, m, r, d, e, b)
    {
        c = q(c, q(q(m ^ (a | ~r), d), b));
        return q(c << e | c >>> 32 - e, a)
    }, g = function(b)
    {
        var a = "", c = "", d;
        for (d = 0; d <= 3; d++) {
            c = b >>> d * 8 & 255;
            c = "0" + c.toString(16);
            a += c.substr(c.length - 2, 2)
        }
        return a
    };
    l.extend({
        md5: function(v)
        {
            var s = [], c, d, a, b, u, r, m, e;
            s = v;
            s = s.replace(/\x0d\x0a/g, "\n");
            v = "";
            for (c = 0; c < s.length; c++) {
                d = s.charCodeAt(c);
                if (d < 128) {
                    v += String.fromCharCode(d)
                } else {
                    if (d > 127 && d < 2048) {
                        v += String.fromCharCode(d >> 6 | 192)
                    } else {
                        v += String.fromCharCode(d >> 12 | 224);
                        v += String.fromCharCode(d >> 6 & 63 | 128)
                    }
                    v += String.fromCharCode(d & 63 | 128)
                }
            }
            s = v = v;
            v = s.length;
            c = v + 8;
            d = ((c - c % 64) / 64 + 1) * 16;
            a = Array(d - 1);
            for (u = b = 0; u < v;) {
                c = (u - u % 4) / 4;
                b = u % 4 * 8;
                a[c] |= s.charCodeAt(u) << b;
                u++
            }
            c = (u - u % 4) / 4;
            b = u % 4 * 8;
            a[c] |= 128 << b;
            a[d - 2] = v << 3;
            a[d - 1] = v >>> 29;
            s = a;
            u = 1732584193;
            r = 4023233417;
            m = 2562383102;
            e = 271733878;
            for (v = 0; v < s.length; v += 16) {
                c = u;
                d = r;
                a = m;
                b = e;
                u = h(u, r, m, e, s[v + 0], 7, 3614090360);
                e = h(e, u, r, m, s[v + 1], 12, 3905402710);
                m = h(m, e, u, r, s[v + 2], 17, 606105819);
                r = h(r, m, e, u, s[v + 3], 22, 3250441966);
                u = h(u, r, m, e, s[v + 4], 7, 4118548399);
                e = h(e, u, r, m, s[v + 5], 12, 1200080426);
                m = h(m, e, u, r, s[v + 6], 17, 2821735955);
                r = h(r, m, e, u, s[v + 7], 22, 4249261313);
                u = h(u, r, m, e, s[v + 8], 7, 1770035416);
                e = h(e, u, r, m, s[v + 9], 12, 2336552879);
                m = h(m, e, u, r, s[v + 10], 17, 4294925233);
                r = h(r, m, e, u, s[v + 11], 22, 2304563134);
                u = h(u, r, m, e, s[v + 12], 7, 1804603682);
                e = h(e, u, r, m, s[v + 13], 12, 4254626195);
                m = h(m, e, u, r, s[v + 14], 17, 2792965006);
                r = h(r, m, e, u, s[v + 15], 22, 1236535329);
                u = p(u, r, m, e, s[v + 1], 5, 4129170786);
                e = p(e, u, r, m, s[v + 6], 9, 3225465664);
                m = p(m, e, u, r, s[v + 11], 14, 643717713);
                r = p(r, m, e, u, s[v + 0], 20, 3921069994);
                u = p(u, r, m, e, s[v + 5], 5, 3593408605);
                e = p(e, u, r, m, s[v + 10], 9, 38016083);
                m = p(m, e, u, r, s[v + 15], 14, 3634488961);
                r = p(r, m, e, u, s[v + 4], 20, 3889429448);
                u = p(u, r, m, e, s[v + 9], 5, 568446438);
                e = p(e, u, r, m, s[v + 14], 9, 3275163606);
                m = p(m, e, u, r, s[v + 3], 14, 4107603335);
                r = p(r, m, e, u, s[v + 8], 20, 1163531501);
                u = p(u, r, m, e, s[v + 13], 5, 2850285829);
                e = p(e, u, r, m, s[v + 2], 9, 4243563512);
                m = p(m, e, u, r, s[v + 7], 14, 1735328473);
                r = p(r, m, e, u, s[v + 12], 20, 2368359562);
                u = n(u, r, m, e, s[v + 5], 4, 4294588738);
                e = n(e, u, r, m, s[v + 8], 11, 2272392833);
                m = n(m, e, u, r, s[v + 11], 16, 1839030562);
                r = n(r, m, e, u, s[v + 14], 23, 4259657740);
                u = n(u, r, m, e, s[v + 1], 4, 2763975236);
                e = n(e, u, r, m, s[v + 4], 11, 1272893353);
                m = n(m, e, u, r, s[v + 7], 16, 4139469664);
                r = n(r, m, e, u, s[v + 10], 23, 3200236656);
                u = n(u, r, m, e, s[v + 13], 4, 681279174);
                e = n(e, u, r, m, s[v + 0], 11, 3936430074);
                m = n(m, e, u, r, s[v + 3], 16, 3572445317);
                r = n(r, m, e, u, s[v + 6], 23, 76029189);
                u = n(u, r, m, e, s[v + 9], 4, 3654602809);
                e = n(e, u, r, m, s[v + 12], 11, 3873151461);
                m = n(m, e, u, r, s[v + 15], 16, 530742520);
                r = n(r, m, e, u, s[v + 2], 23, 3299628645);
                u = o(u, r, m, e, s[v + 0], 6, 4096336452);
                e = o(e, u, r, m, s[v + 7], 10, 1126891415);
                m = o(m, e, u, r, s[v + 14], 15, 2878612391);
                r = o(r, m, e, u, s[v + 5], 21, 4237533241);
                u = o(u, r, m, e, s[v + 12], 6, 1700485571);
                e = o(e, u, r, m, s[v + 3], 10, 2399980690);
                m = o(m, e, u, r, s[v + 10], 15, 4293915773);
                r = o(r, m, e, u, s[v + 1], 21, 2240044497);
                u = o(u, r, m, e, s[v + 8], 6, 1873313359);
                e = o(e, u, r, m, s[v + 15], 10, 4264355552);
                m = o(m, e, u, r, s[v + 6], 15, 2734768916);
                r = o(r, m, e, u, s[v + 13], 21, 1309151649);
                u = o(u, r, m, e, s[v + 4], 6, 4149444226);
                e = o(e, u, r, m, s[v + 11], 10, 3174756917);
                m = o(m, e, u, r, s[v + 2], 15, 718787259);
                r = o(r, m, e, u, s[v + 9], 21, 3951481745);
                u = q(u, c);
                r = q(r, d);
                m = q(m, a);
                e = q(e, b)
            }
            return (g(u) + g(r) + g(m) + g(e)).toLowerCase()
        }
    })
})(jQuery);
function CheckAllFields(c, a)
{
    var h = "";
    var e = 0;
    for (var b in a) {
        var g = a[b];
        var d = checkFormField(c, g, "#Edit" + c + "_");
        if (d !== "") {
            e += 1;
            h += d
        }
    }
    if (e > 0) {
        AlertPopup(h)
    }
    return e
}
function getFromTemplate(b, o, m)
{
    var e = m, c = e.match(/\{[-\(\+\,\[\s]?\w+[\)\]]?\}/gi);
    if (!o) {
        return ""
    }
    for (var d in c) {
        var n = c[d], p = "", g = "", q = "", h;
        n = n.substr(1, n.length - 2);
        h = n.substr(0, 1);
        switch (h) {
            case"-":
                g = " - ";
                break;
            case",":
                g = ", ";
                break;
            case"+":
            case" ":
                g = h;
                break;
            case"(":
                g = " (";
                q = ")";
                break;
            case"[":
                g = " [";
                q = "]";
                break;
            default:
                break
        }
        if (g.length > 0) {
            n = n.substr(1, n.length - (q.length + 1))
        }
        if (o[n] !== undefined && o[n].value !== undefined) {
            p = display_value(b, n, o);
            if (p !== "") {
                p = g + p + q
            }
        }
        e = e.replace(c[d], p)
    }
    return e
}
function getNavButtons(a)
{
    return '<div style="text-align:center;" ><a id="' + a + 'L" href="#" class="navLeftIcon mbsc-ic mbsc-ic-arrow-left"></a><span id="' + a + 'T">&nbsp;</span><a id="' + a + 'R" href="#" class="navRightIcon mbsc-ic mbsc-ic-arrow-right"/></div>'
}
function ShowBeansList(a, l, d, b, g, e, h, c, n)
{
    if (!init_done) {
        MobileInit();
        return
    }
    var m = Beans[a], o = $("#" + e);
    if (l !== "") {
        o.append('<li data-theme="d" style="background: #dddddd">' + l + "</li>")
    }
    QCRM.get_entry_list(a, d, m.ListFieldsToSelect(), m.link_phone_fields, c, b, g, function(w)
    {
        if (l !== "") {
            $("#" + e + " li").remove()
        } else {
            $("#" + e + " li:gt(0)").remove()
        }
        if (w && w.entry_list !== undefined) {
            if (w.next_offset === 0 || w.result_count === 0) {
                o.append("<li>" + RES_NO_MORE_RECORDS + "</li>")
            } else {
                var p = 0, u = w.entry_list.length;
                for (p = 0; p < u; p++) {
                    var v = w.entry_list[p], q = v.module_name;
                    var s = AddLinkWithIcon(q, v.id, "", v.name_value_list, (w.relationship_list && w.relationship_list[p] && w.relationship_list[p].link_list) ? w.relationship_list[p].link_list : [], h, false, "");
                    o.append(s)
                }
            }
            try {
                o.listview("refresh")
            } catch (r) {
            }
            if (mobile_app) {
            }
            n({
                next_offset: w.next_offset,
                result_count: w.result_count,
                total_count: (w.total_count !== undefined ? w.total_count : false)
            })
        } else {
            n({next_offset: 0, result_count: 0, total_count: false})
        }
    })
}
function SetSelect()
{
    var b = $("#CS_LinkedId").val(), c = $("#CSFromModule").val(), d = Beans[c], a = $("#CSFromId").val(), e = $("#CSLnk").val();
    if (b !== "") {
        QCRM.set_relationship(c, a, e, b)
    }
    setTimeout(function()
    {
        var g = $("#CSPrevPage").val();
        $("#" + g + " .ui-header a").click();
        if (b !== "" && !d.fullPage) {
            getRelatedList(c, e)
        }
    }, 200)
}
function PickSelect(a)
{
    pickRelate("", "LinkedId", "SearchText", $("#CSToModule").val(), $("#CSWhere").val(), [], "CS_", function(b)
    {
        enableButton("CSSelect", b !== "")
    }, 0)
}
function OpenSelect(c, d, b, e, a)
{
    a = a || "";
    enableButton("CSSelect", false);
    $("#CreateSelectModule").text(sugar_app_list_strings.moduleListSingular[c]);
    $("#CS_SearchText").val("");
    $("#CSFromModule").val(d);
    $("#CSPrevPage").val($("#CSSelect").attr("href", "#" + $("body").pagecontainer("getActivePage").attr("id")));
    $("#CSFromId").val(b);
    $("#CSToModule").val(c);
    $("#CSWhere").val(a);
    $("#CSLnk").val(e);
    $("#CS_LinkedId").val("");
    PickSelect()
}
$("#CreateSelect").on("pagecreate", function()
{
    $("#CSSelect").text(sugar_app_strings.LBL_LINK_SELECT);
    $("#CSCancelBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
    $("#CS_SearchText").on("input", PickSelect);
    $("#CS_SearchText").attr("placeholder", RES_SEARCH_LABEL)
});
$("#CreateSelect").on("pageshow", function()
{
    PickSelect()
});
function CreateFromEditForm(h, a, g, e)
{
    var l = "#Edit" + a + "_", b = {
        name: {
            name: "name",
            value: $(l + g).val()
        }
    }, d = sugar_mod_fields[a][g], c = d.copyfields === undefined ? [] : d.copyfields;
    $("#" + a + g + "CG").hide();
    CopyFieldsToRelated(c, b, l);
    QCRM.set_entry(h, "", b, function(m)
    {
        if (!m || ((m.name !== undefined) && (m.name === "Access Denied"))) {
            return
        }
        $("#Edit" + a + "_" + e).val(m.id)
    })
}
function OpenRename(a, b, d, c)
{
    $("#RenInitText").val(a);
    $("#RenInitModule").val(b);
    $("#RenInitId").val(d);
    $("#RenNewText").val("");
    $("#RenConfirm").unbind("click");
    $("#RenConfirm").click(c);
    $("#RenConfirm").attr("href", "#" + b + "Search")
}
$("#Rename").on("pagecreate", function()
{
    $("#RenameTitle").text(RES_RENAME);
    $("#RenConfirm").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL)
});
function QCRM_Reminder(c, b, a)
{
    this.datetime = c;
    this.cron = null;
    this.active = Pref.Reminders;
    this.module = b;
    this.id = a
}
QCRM_Reminder.prototype.set = function()
{
};
QCRM_Reminder.prototype.unset = function()
{
};
QCRM_Reminder.prototype.display = function(a)
{
};
QCRM_Reminder.prototype.repeat = function(a)
{
};
function QCM_RemindersList()
{
    this.date = CurrentDate;
    this.modules = [];
    this.list = [];
    this.update = function()
    {
    };
    this.findReminder = function(d, c)
    {
        var e = false, a, b;
        for (a in this.list) {
            b = this.list[a];
            if (b.module === d && b.id === c) {
                e = b;
                break
            }
        }
        return e
    }
}
QCRM.reminders = new QCM_RemindersList();
QCRM.FieldProperty = function(b, a, d)
{
    var c = sugar_mod_fields[a][d];
    if (c[b] != undefined) {
        return c[b]
    }
    if (SugarFields[c.type] && SugarFields[c.type][b] != undefined) {
        return SugarFields[c.type][b]
    }
    return false
};
function SugarType(a, b)
{
    this.name = a;
    this.input_type = "text";
    this.show_empty = false;
    this.after_save = false;
    this.add_listener = false;
    this.inline_btn = false;
    this.inline_edit = true;
    this.readonly_not_empty = false;
    this.whitespace = false;
    this.has_link = b == true;
    this.icon = ""
}
function generatedLink(a, d, c)
{
    var g = sugar_mod_fields[a][d].def;
    try {
        g = g.substring(0, 4) !== "http" ? ("http://" + g) : g;
        var e = g.replace(regFindField, "$2");
        while (e !== g) {
            g = g.replace(regFindField, "$1") + c[e].value + g.replace(regFindField, "$3");
            e = g.replace(regFindField, "$2")
        }
    } catch (b) {
    }
    return g
}
SugarType.prototype.readonly = function(a, b)
{
    if (sugar_mod_fields[a][b]) {
        return sugar_mod_fields[a][b].readonly
    }
    return false
};
SugarType.prototype.required = function(a, b)
{
    if (sugar_mod_fields[a][b]) {
        return sugar_mod_fields[a][b].req
    }
    return false
};
SugarType.prototype.displayEmpty = function(a, b)
{
};
SugarType.prototype.isEmptyField = function(a, c, b)
{
    if (b[c] && b[c].value != "") {
        return false
    }
    return true
};
SugarType.prototype.displayField = function(d, m, o, c)
{
    var l = $("<p/>"), n, h, b, a = $('<h4 style="white-space:normal;"/>'), e, g = sugar_mod_fields[d][m];
    if (QCRM.mode === "tablet") {
        b = $('<table width="100%"/>');
        h = $("<tr/>");
        e = $('<td style="vertical-align:top"/>');
        n = $('<td width="110em" style="vertical-align:top"/>');
        l = $("<p/>");
        b.append(h);
        e.append(a);
        n.append(l)
    } else {
        h = $("<div/>");
        b = h;
        e = a;
        n = l
    }
    h.append(n);
    h.append(e);
    if (this.label) {
        n = this.label(d, m, o, c)
    } else {
        n = display_label(d, m, true)
    }
    if (n && n != "") {
        l.append(n)
    }
    if (g.Details) {
        a.append(g.Details(c))
    } else {
        if (this.thumbnail) {
            a.append(this.thumbnail(d, m, o, c))
        }
        a.append(this.displayValue(d, m, o, c))
    }
    return b
};
SugarType.prototype.display = function(a, d, c, b)
{
    return c
};
SugarType.prototype.display_link = function(a, d, c, b)
{
    return false
};
SugarType.prototype.displayValue = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e];
    if (d.display) {
        return d.display(c, b)
    }
    return this.display(a, e, c, b)
};
SugarType.prototype.displayLink = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e];
    if (d.display_link) {
        return d.display_link(c, b)
    }
    return this.display_link(a, e, c, b)
};
SugarType.prototype.field_container = function(b, e)
{
    var d = sugar_mod_fields[b][e];
    if (d.field_container) {
        return d.field_container(b, e)
    }
    var c = QCRM.FieldProperty("icon", b, e), a = "id='" + b + e + "V' style='" + (QCRM.FieldProperty("has_link", b, e) ? "" : "padding-top:0px;padding-bottom:0px;") + (QCRM.FieldProperty("whitespace", b, e) ? "white-space:normal!important;" : "") + "'";
    if (e.indexOf("mobile") !== -1) {
        a += " data-icon='comment'  class='ui-alt-icon ui-nodisc-icon' data-split-theme='d'"
    } else {
        if (c !== "") {
            a += ' data-icon="' + c + '" class="ui-alt-icon ui-nodisc-icon"'
        }
    }
    return $("<li " + a + "/>")
};
SugarType.prototype.addFieldContainer = function(e, c, q, b)
{
    var s = c + q + "V", r = b[q] ? b[q].value : "", h = sugar_mod_fields[c][q], o = QCRM.FieldProperty("inline_btn", c, q), m = QCRM.FieldProperty("show_empty", c, q), p = this.displayLink(c, q, r, b), g = this.isEmptyField(c, q, b), d;
    if (g) {
        if (m) {
            d = $('<li id="' + s + '" isempty="0"/>')
        } else {
            d = $('<li id="' + s + '" isempty="1" style="display:none;"/>')
        }
        d.append("<p>" + display_label(c, q, true) + "</p>")
    } else {
        var n = this.displayField(c, q, r, b), d = this.field_container(c, q), a;
        if (p) {
            p.css("padding-top", "2px");
            p.css("padding-bottom", "3px");
            p.append(n);
            d.append(p);
            if (this.display_link2) {
                var l = this.display_link2(c, q, r, b);
                if (l != "") {
                    d.append(l)
                }
            }
        } else {
            n.css("padding-top", "2px");
            n.css("padding-bottom", "3px");
            d.append(n);
            if (iOS) {
                d.click = function(u)
                {
                    u.preventDefault();
                    return false
                }
            }
        }
    }
    $(e).append(d);
    if (mobile_edition == "Pro" && !h.readonly && !h.no_inline_edit && SugarFields[h.type].inline_edit) {
        if (o) {
            d.append('<input type="button" class="ui-alt-icon ui-nodisc-icon" id="E' + c + q + '" data-link="editbtn" href="#" data-icon="edit" data-iconpos="notext" data-theme="c">');
            $("#E" + c + q).button()
        }
        addInlineEdit(c, this.inlineFields(c, q, b), b.id.value, b, d, "inline")
    }
    return d
};
SugarType.prototype.createEdit = function(b, a, c)
{
};
SugarType.prototype.initEdit = function(c, a, d, b)
{
};
SugarType.prototype.saveValue = function(a, c, b)
{
};
SugarType.prototype.deleteValue = function(a, c, b)
{
};
SugarType.prototype.inlineFields = function(a, c, b)
{
    return [c]
};
SugarFields.custom = new SugarType("custom");
SugarFields.hidden = new SugarType("hidden");
SugarFields.hidden.addFieldContainer = function(c, a, d, b)
{
    return false
};
SugarFields.name = new SugarType("name");
SugarFields.id = new SugarType("id");
SugarFields.varchar = new SugarType("varchar");
SugarFields["char"] = new SugarType("char");
SugarFields.html = new SugarType("html");
SugarFields.html.inline_edit = false;
SugarFields.html.isEmptyField = function(a, c, b)
{
    return sugar_mod_fields[a][c].def == ""
};
SugarFields.html.display = function(a, e, d, b)
{
    var g = $('<div style="margin-left:20px;" data-enhance="false"/>'), c = sugar_mod_fields[a][e].def || "";
    g.append(d == "" ? c.replace("_blank", "_system") : d);
    return g
};
SugarFields.html.readonly = function(a, b)
{
    return true
};
SugarFields.readonly = new SugarType("readonly");
SugarFields.readonly.readonly = function(a, b)
{
    return true
};
SugarFields.readonly.inline_edit = false;
SugarFields.iframe = new SugarType("iframe");
SugarFields.iframe.isEmptyField = function(a, d, b)
{
    var c = sugar_mod_fields[a][d];
    if (c.gen === 1) {
        return false
    }
    if (b[d] && b[d].value != "" && b[d].value != "http://") {
        return false
    }
    return true
};
SugarFields.iframe.display = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e];
    if (d.gen === 1) {
        lnk = generatedLink(a, e, b)
    } else {
        lnk = c
    }
    return $('<iframe id="' + a + e + 'I" src="' + lnk + '" width="95%" height="' + d.height + '"></iframe>')
};
function OpenAddressLink(c, e, a, b)
{
    var g, d;
    if (!mobile_app || QCRM.internalMap || mobile_edition != "Pro") {
        if (QCRM.JJWG && JJWG.googlemaps && e.jjwg_maps_geocode_status_c && (e.jjwg_maps_geocode_status_c.value === "OK" || e.jjwg_maps_geocode_status_c.value === "APPROXIMATE")) {
            g = $("<a/>", {href: "#JJWG", style: QCRM.inlineStyle});
            JJWG.AddMapLink(g, c, e)
        } else {
            g = "https://maps.google.com/?q=" + a + "&t=m&z=13&iwloc=near&output=html";
            g = CreateExtLink(g, "");
            if (!mobile_app) {
                g.attr("target", "_blank")
            }
        }
    } else {
    }
    return g
}
SugarFields.jjwgaddress = new SugarType("jjwgaddress", true);
SugarFields.jjwgaddress.icon = "location";
SugarFields.jjwgaddress.display_link = function(a, d, c, b)
{
    return OpenAddressLink(a, b, b[d].value, null)
};
SugarFields.address = new SugarType("address", true);
SugarFields.address.icon = "location";
SugarFields.address.display_link = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e], g = address_values(b, a, d.key), h;
    if (g.google !== "") {
        return OpenAddressLink(a, b, g.google, d.key)
    }
    return ""
};
SugarFields.address.isEmptyField = function(a, d, b)
{
    var c = sugar_mod_fields[a][d], e = address_values(b, a, c.key);
    return (e.google == "")
};
SugarFields.address.inlineFields = function(a, c, b)
{
    return getAddressFields(sugar_mod_fields[a][c].key, a)
};
SugarFields.address.display = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e], g = address_values(b, a, d.key);
    if (g.google !== "") {
        return g.display
    }
    return ""
};
SugarFields.url = new SugarType("url", true);
SugarFields.url.isEmptyField = SugarFields.iframe.isEmptyField;
SugarFields.url.display_link = function(b, g, d, c)
{
    var e = sugar_mod_fields[b][g], a, h = d.substring(0, 4) !== "http" ? ("http://" + d) : d;
    if (e.gen === 1) {
        return $('<a href="' + generatedLink(b, g, c) + '" class="QCRMLinks" />')
    } else {
        if (h === "" || h === "http://") {
            return ""
        } else {
            a = $('<a href="#" class="QCRMLinks" />');
            a.click(function()
            {
                OpenURL(h)
            });
            return a
        }
    }
};
SugarFields.url.display = function(a, e, c, b)
{
    var d = sugar_mod_fields[a][e];
    if (d.gen === 1) {
        lnk = generatedLink(a, e, b)
    } else {
        lnk = c
    }
    return lnk
};
SugarFields["enum"] = new SugarType("enum");
SugarFields["enum"].display = function(a, h, c, b)
{
    var g = sugar_mod_fields[a][h];
    if (g.options === undefined) {
        return c
    }
    var d = sugar_app_list_strings[g.options][c];
    return (d === undefined ? c : d)
};
SugarFields.multienum = new SugarType("multienum");
SugarFields.multienum.display = function(b, m, n, a)
{
    var c = sugar_mod_fields[b][m], g = n.substr(1, n.length - 2).replace(/\^,\^/g, "%").replace(/\^\^/g, "%").split("%"), l = "<ul>", h = g.length, e;
    for (e = 0; e < h; e++) {
        var d;
        d = sugar_app_list_strings[c.options][g[e]];
        l += "<li>" + (d === undefined ? g[e] : d) + "</li>"
    }
    return l + "</ul>"
};
SugarFields.date = new SugarType("date");
SugarFields.date.display = function(a, d, c, b)
{
    if (!c || c.length < 10) {
        return ""
    }
    return jQuery.mobiscroll.formatDate(date_format, fromDBDate(c))
};
SugarFields.datetime = new SugarType("datetime");
SugarFields.datetime.display = function(a, d, c, b)
{
    if (!c || c.length < 14) {
        return ""
    }
    return jQuery.mobiscroll.formatDate(datetime_format, fromDBDateTime(c))
};
SugarFields.bool = new SugarType("bool");
SugarFields.bool.displayField = function(a, d, c, b)
{
    var e = $("<h4/>");
    e.append(sugar_mod_strings[a][sugar_mod_fields[a][d].label] + "&nbsp;");
    e.append('<input type="checkbox" disabled="disabled" ' + ((c === 1 || c === "1") ? 'checked="checked"' : "") + ">");
    return e
};
SugarFields.bool.display = function(b, e, d, c)
{
    var a = sugar_mod_strings[b][sugar_mod_fields[b][e].label];
    if (d === 1 || d === "1") {
        return a
    } else {
        return '<span style="text-decoration:line-through">' + a + "</span>"
    }
};
SugarFields.bool.isEmptyField = function(a, c, b)
{
    return false
};
SugarFields["int"] = new SugarType("int");
SugarFields.autoincrement = new SugarType("autoincrement");
SugarFields.autoincrement.readonly = function(a, b)
{
    return true
};
SugarFields.currency = new SugarType("currency");
SugarFields.currency.display = function(a, e, d, b)
{
    if (d === "") {
        d = "0"
    }
    var c = default_currency_symbol;
    if (b.currency_symbol && b.currency_symbol.value !== undefined) {
        c = b.currency_symbol.value
    }
    return parseFloat(d).formatCurrency(currency_digits, decimal_separator, number_separator, c)
};
SugarFields["float"] = new SugarType("float");
SugarFields["float"].display = function(a, d, c, b)
{
    if (c === "") {
        return ""
    } else {
        return parseFloat(c).formatNumber(2, decimal_separator, number_separator)
    }
};
SugarFields.text = new SugarType("text");
SugarFields.text.display = function(a, d, c, b)
{
    return c.replace(/\\n/g, "<br>").replace(/\n/g, "<br>").replace(/\\r/g, "").replace(/\r/g, "")
};
SugarFields.email = new SugarType("email", true);
SugarFields.email.display_link = function(a, d, c, b)
{
    c = c.trim();
    if (c === "" || (b.email_opt_out && b.email_opt_out.value === "1")) {
        return ""
    }
    return $('<a href="mailto:' + c + '" rel="external" target="_blank" class="QCRMLinks" />')
};
SugarFields.email.display = function(a, d, c, b)
{
    c = c.trim();
    if (c === "") {
        return ""
    } else {
        if (b.email_opt_out && b.email_opt_out.value === "1") {
            return '<span style="text-decoration:line-through">' + c + "</span>"
        }
    }
    return c
};
SugarFields.email.icon = "mail";
SugarFields.phone = new SugarType("phone", true);
SugarFields.phone.link_button = function(e, p, o, m, n, a, g, h, q, b)
{
    var d = cleanup_phone(p);
    var c = $("<a/>", {
        "class": "ui-alt-icon ui-nodisc-icon",
        href: QCRM.telLink + d,
        rel: "external",
        click: function(l)
        {
            setTimeout(function()
            {
                try {
                    $(e).popup("close")
                } catch (r) {
                }
                LogCall(m, n, h, q, b)
            }, 50)
        },
        style: "text-decoration:none;color:#444;"
    });
    c.append(display_label(a, o) + " " + p);
    return c
};
SugarFields.phone.display_link = function(a, d, c, b)
{
    var e = cleanup_phone(c);
    return $("<a/>", {
        href: QCRM.telLink + e,
        rel: "external",
        style: "text-decoration:none;color:#444;" + QCRM.inlineStyle,
        click: function(g)
        {
            LogCall(a, b.id ? b.id.value : Beans[a].CurrentId, Beans[a].DisplayTitle(b), (b.account_id ? b.account_id.value : ""), (a !== "Calls" || (b.status && b.status.value === "Held")));
            return true
        }
    })
};
SugarFields.phone.display_link2 = function(a, d, c, b)
{
    if (d.indexOf("mobile") !== -1) {
        return ($("<a/>", {
            href: "sms:" + cleanup_phone(c),
            rel: "external",
            title: "SMS",
            style: "text-decoration:none;color:#444;"
        }))
    }
    return ""
};
SugarFields.phone.icon = "phone";
SugarFields.phone.icon2 = "comment";
SugarFields.relate = new SugarType("relate", true);
SugarFields.relate.display_link = function(b, h, e, c)
{
    var g = sugar_mod_fields[b][h], d = g.module, a = g.id_name;
    if (ViewPages.indexOf(d) === -1 || c[a] === undefined) {
        return ""
    } else {
        return $("<a/>", {
            href: "#",
            "data-module": d,
            "data-link": "bean",
            "data-identity": c[a].value,
            style: "text-decoration:none;color:#444;" + QCRM.inlineStyle
        })
    }
};
SugarFields.parent = new SugarType("parent", true);
SugarFields.parent.display_link = function(b, h, e, c)
{
    var g = sugar_mod_fields[b][h], d = c[g.id_type].value, a = g.id_name;
    if (ViewPages.indexOf(d) === -1 || c[a] === undefined) {
        return ""
    } else {
        return $("<a/>", {
            href: "#",
            "data-module": d,
            "data-link": "bean",
            "data-identity": c[a].value,
            style: "text-decoration:none;color:#444;" + QCRM.inlineStyle
        })
    }
};
SugarFields.parent.thumbnail = function(b, h, e, c)
{
    var g = sugar_mod_fields[b][h], d = c[g.id_type].value, a = g.id_name;
    return "<img style='top:50%;margin-top:-9px;margin-right:8px;' src='" + Beans[d].icon() + "' width='16' height='16'/>"
};
SugarFields.Drawing = new SugarType("Drawing");
SugarFields.Drawing.inline_btn = false;
SugarFields.Drawing.whitespace = true;
SugarFields.Drawing.isEmptyField = function(a, c, b)
{
    return false
};
SugarFields.Drawing.display = function(c, l, m, b)
{
    var e = sugar_mod_fields[c][l], d = c + l + "PV", h = "ED" + c + l, g = c + l + "HD", a = '<div class="DrawingDisplay" id="' + d + '"/>';
    $("#" + d).remove();
    SugarQuery("get_drawing", '{"session":"' + SugarSessionId + '","module_name":"' + c + '","id":"' + b.id.value + '","field":"' + l + '"}', function(s)
    {
        if (!s) {
            return
        }
        var o = s.entry_list.hasDrawing, p = '<input type="hidden" id="' + g + '" >', r = "", n = (e.height === "") ? 250 : parseInt(e.height.replace("px", ""), 10), q = (e.width === "") ? 300 : parseInt(e.width.replace("px", ""), 10);
        if (q > QCRM.DrawingWidth) {
            n = Math.round(n * QCRM.DrawingWidth / q);
            q = QCRM.DrawingWidth
        }
        if (!o || !QCRM.LockSetDrawing) {
            p += '<input type="button" id="' + h + '" data-link="editbtn" href="#" data-icon="edit" data-iconpos="notext" data-inline="true" data-theme="d"></a>'
        }
        if (o) {
            r = " width=" + q.toString() + "px height=" + n.toString() + "px";
            p += '<img type="image/png"' + r + ' src="data:image/png;base64,' + escape(s.entry_list.contents) + '">'
        }
        $("#" + d).html(p);
        $("#" + h).button();
        $("#" + g).val(o ? "1" : "0")
    }, null);
    return a
};
SugarFields.image = new SugarType("image");
SugarFields.image.show_empty = true;
SugarFields.image.inline_btn = true;
SugarFields.image.whitespace = true;
SugarFields.image.display = function(c, h, m, b)
{
    var e = sugar_mod_fields[c][h], d = c + h + "PV", g = c + h + "HD", a = '<div class="ImageDisplay" id="' + d + '"><em>... Loading ...</em></div>', l = "get_" + e.type;
    if (!QCRM.imageFields[e.type]) {
        return ""
    }
    SugarQuery(l, '{"session":"' + SugarSessionId + '","module_name":"' + c + '","id":"' + b.id.value + '","field":"' + h + '","name":"' + m + '"}', function(s)
    {
        if (!s) {
            return
        }
        var o = s.entry_list.hasDrawing, p = '<input type="hidden" id="' + g + '" >', r = "", n = (!e.height || e.height === "") ? (e.type == "image" ? 50 : 0) : parseInt(e.height.replace("px", ""), 10), q = (!e.width || e.width === "") ? (e.type == "image" ? 200 : 0) : parseInt(e.width.replace("px", ""), 10);
        if (q > QCRM.DrawingWidth) {
            n = Math.round(n * QCRM.DrawingWidth / q);
            q = QCRM.DrawingWidth
        }
        if (o) {
            if (e.type == "image") {
                r = ' style="max-width:' + q.toString() + "px;height=" + n.toString() + 'px"'
            } else {
                if (q == 0) {
                    r = ' style="max-width:' + QCRM.DrawingWidth.toString() + "px"
                } else {
                    r = ' style="width:' + q.toString() + "px"
                }
                if (n == 0) {
                    r += '"'
                } else {
                    r += ";height:" + n.toString() + 'px"'
                }
            }
            p += '<img type="image/png"' + r + ' src="data:image/png;base64,' + escape(s.entry_list.contents) + '">'
        }
        $("#" + d).html(p);
        $("#" + g).val(o ? "1" : "0")
    }, null);
    return a
};
SugarFields.photo = new SugarType("photo");
SugarFields.photo.show_empty = true;
SugarFields.photo.inline_btn = true;
SugarFields.photo.whitespace = true;
SugarFields.photo.display = SugarFields.image.display;
SugarFields.file = new SugarType("file");
SugarFields.file.display_link = function(a, d, c, b)
{
    return CreateDownloadLink(a, b.id.value, b)
};
SugarFields.file.display = function(a, e, d, c)
{
    try {
        return decodeURI(d)
    } catch (b) {
        return decodeURI(unescape(d))
    }
    return d
};
SugarFields.file.icon = "tag";
SugarFields.file.inline_edit = false;
SugarFields.decimal = SugarFields["float"];
SugarFields["double"] = SugarFields["float"];
SugarFields["boolean"] = SugarFields.bool;
SugarFields.radioenum = SugarFields["enum"];
SugarFields.dynamicenum = SugarFields["enum"];
function SugarLink(e, c, h, b, g, a, d)
{
    this.name = e;
    this.from = c;
    this.module = h;
    this.id_name = b;
    this.create = g;
    this.select = a;
    this.swipePos = 10;
    if (d !== undefined && d !== false) {
        this.swipeType = "noswipe"
    } else {
        this.swipeType = "all"
    }
}
SugarLink.prototype.addSwipe = function(b)
{
    var a = this.from + this.name;
    this.swipeType = a;
    if (!QCRM.relationshipSwipe[a]) {
        QCRM.relationshipSwipe[a] = {}
    }
    if (!QCRM.relationshipSwipe[a].stages) {
        QCRM.relationshipSwipe[a].stages = QCRM.defaultRelSwipe.slice()
    }
    b.percent = this.swipePos;
    QCRM.relationshipSwipe[a].stages.push(b);
    this.swipePos += 15
};
SugarLink.prototype.DisplayRecord = function(c, b, a)
{
    Beans[this.module].DisplaySubpanelRecord(c, b, a, this.from, this.name)
};
QCRM.CheckDuplicateAccount = function(a, b)
{
    return false
};
QCRM.CheckDuplicatePerson = function(a, b)
{
    return false
};
function SugarBean(a, c, b, e, d)
{
    var g = this;
    QCRM.custom[a] = {};
    if (typeof b === "boolean") {
        d = e;
        e = b;
        b = "basic"
    } else {
        if (b === undefined) {
            b = "basic"
        }
        if (e === undefined) {
            e = false
        }
    }
    this.available_CE = true;
    this.template = b;
    this.Fields = [];
    this.link_fields = "";
    this.link_phone_fields = "";
    this.name = a;
    this.table = c;
    this.Predefined = [];
    this.HomeIcon = true;
    this.ShowTab = true;
    this.LastViewed = true;
    this.Favorites = false;
    this.CurrentId = "";
    this.CurrentName = "";
    this.CurrentData = {};
    this.CurrentCustomData = {};
    this.CurrentParentId = "";
    this.CurrentParentType = "";
    this.CurrentParentName = "";
    this.LimitWhere = "";
    this.CurrentOffset = 0;
    this.PrevOffset = 0;
    this.NextOffset = 0;
    this.CurrentSearch = false;
    this.CurrentSearchValues = false;
    this.CurrentSearchOrder = false;
    this.SearchFields = [];
    this.SyncOrderBy = c + ".date_entered desc";
    this.SyncDefaults = {sync: "Mine", max: true};
    this.TableViewTpl = [];
    this.CustomListViewTpl = false;
    this.ListData = false;
    this.CheckDuplicates = false;
    this.DuplicateButton = true;
    this.GlobalSearchTpl = "{name}";
    this.basic_search = ["name"];
    switch (this.template) {
        case"person":
            this.TitleFields = ["first_name", "last_name"];
            this.TitleTpl = "{first_name} {last_name}";
            this.OrderBy = "last_name";
            this.SearchName = toDBConcatName(c + ".first_name", c + ".last_name");
            this.Favorites = true;
            break;
        case"file":
            this.TitleFields = ["document_name"];
            this.TitleTpl = "{document_name}";
            this.OrderBy = "document_name";
            this.SearchName = c + ".document_name";
            this.GlobalSearchTpl = "{document_name}";
            this.basic_search = ["document_name"];
            break;
        case"company":
            this.Favorites = true;
        default:
            this.TitleFields = ["name"];
            this.TitleTpl = "{name}";
            this.OrderBy = "name";
            this.SearchName = c + ".name";
            break
    }
    this.ListFields = this.TitleFields.slice();
    this.highlighted = [];
    this.ListViewTpl = "<h4>" + this.TitleTpl + "</h4>";
    this.AdditionalFields = [];
    this.PhoneFields = [];
    this.EditExcluded = ["created_by_name", "modified_by_name", "date_entered", "date_modified"];
    this.DetailExcluded = [];
    this.Links = {};
    this.CustomLinks = false;
    this.CustomListFields = [];
    this.fullPage = (QCRM.mode !== "tablet");
    this.swipePos = 10;
    this.swipeType = "all";
    this.ColoredField = "";
    this.CustomColors = [];
    this.AddBtn = false;
    this.enablePDF = false;
    this.hasIconClass = false;
    this.icon = function()
    {
        var h = froot + "images/", l = QCRM.OldIcons ? "gif" : "svg";
        if (QCRM.CRM_Icons) {
            h = ServerAddress + "index.php?entryPoint=getImage&imageName=icon_" + a + "_32." + l
        } else {
            if (QCRM.DefIcons.indexOf(a) >= 0) {
                h += "icon_" + a + "_32." + l
            } else {
                h += this.template + "_32.svg"
            }
        }
        return h
    };
    this.icon32 = this.icon();
    this.hooks = {
        install: [],
        actions: [],
        init_view: [],
        init_list: [],
        init_search: [],
        init_edit: [],
        check_edit: [],
        confirm_before_save: [],
        check_before_save: [],
        check_delete: [],
        after_retrieve: [],
        before_display: [],
        before_edit: [],
        before_create: [],
        before_update: [],
        after_display: [],
        before_save: [],
        after_save: [],
        after_delete: []
    };
    this.access = ((mobile_app) ? (typeof sugar_mod === "undefined" ? "edit" : "none") : "view");
    this.acl = {list: true, view: true, edit: true, exp: true, del: true};
    this.toUpdate = false;
    this.toUpdateFields = {};
    this.link_name_to_fields = {};
    this.OLExtraFields = [];
    this.CreateHook = function()
    {
    };
    this.CreateBtnHook = function()
    {
    };
    this.UpdateBtnHook = function()
    {
    };
    this.StoreFieldsSaved = [];
    this.AllFieldsSaved = [];
    this.DisplaySubpanelElt = function(h)
    {
        return getFromTemplate(this.name, h, this.ListViewTpl)
    };
    this.DisplayCalendarElt = function(h)
    {
        return getFromTemplate(this.name, h, this.CalendarViewTpl || this.ListViewTpl)
    };
    this.DefaultRelate = false;
    this.DefaultParent = false;
    this.SaveFields = function(h)
    {
        return ""
    };
    this.MyItemsQuery = function()
    {
        return "(" + this.table + ".assigned_user_id = '" + CurrentUserId + "')"
    }
}
QCRM.SetSearchNameFields = function(e, b)
{
    if (!sugar_mod_fields[e]) {
        return
    }
    var a = Beans[e], d, l = [], h, g, c;
    for (d in b) {
        h = b[d];
        g = sugar_mod_fields[e][h];
        if (h == "default") {
            l.push("(" + a.SearchName + " @@)")
        } else {
            if (g) {
                if (a.ListFields.indexOf(h) === -1) {
                    a.ListFields.push(h)
                }
                c = ((QCRM.OffLine || g.source === null || g.source === undefined) ? "" : g.source);
                if (!QCRM.OffLine && g.type == "email") {
                    l.push("(" + a.table + ".id in (SELECT eabr.bean_id FROM email_addr_bean_rel eabr JOIN email_addresses ea ON (ea.id = eabr.email_address_id) WHERE eabr.deleted=0 AND ea.email_address @@))")
                } else {
                    l.push("(" + a.table + c + "." + h + " @@)")
                }
            }
        }
    }
    a.SearchArray = "(" + l.join(" OR ") + ")"
};
QCRM.SetSearchTemplateFields = function(d, b)
{
    if (!sugar_mod_fields[d]) {
        return
    }
    var a = Beans[d], c, e;
    for (c in b) {
        e = b[c];
        if (!sugar_mod_fields[d][e]) {
            continue
        }
        if (a.ListFields.indexOf(e) === -1) {
            a.ListFields.push(e)
        }
        e = " {-" + e + "}";
        a.ExtendedTitleTpl += e;
        a.GlobalSearchTpl += e
    }
};
QCRM.SetTitleFields = function(e, b)
{
    var d, g, c = Beans[e], h = [];
    if (!c) {
        return
    }
    if (typeof b == "string") {
        b = [b]
    }
    for (d in c.TitleFields) {
        g = c.TitleFields[d];
        if (c.EditExcluded.indexOf(g) === -1) {
            c.EditExcluded.push(g)
        }
    }
    c.TitleFields = b;
    for (d in b) {
        var g = b[d];
        if (c.ListFields.indexOf(g) === -1) {
            c.ListFields.push(g)
        }
        var a = c.AdditionalFields.indexOf(g);
        if (a !== -1) {
            c.AdditionalFields.splice(a, 1)
        }
        h.push("{" + g + "}")
    }
    c.TitleTpl = h.join(" ")
};
SugarBean.prototype.updateSearchName = function(a)
{
    QCRM.SetSearchNameFields(this.name, a)
};
SugarBean.prototype.addSwipe = function(a)
{
    this.swipeType = this.name;
    if (!QCRM.moduleSwipe[this.name]) {
        QCRM.moduleSwipe[this.name] = {}
    }
    if (!QCRM.moduleSwipe[this.name].stages) {
        QCRM.moduleSwipe[this.name].stages = QCRM.defaultSwipe.slice()
    }
    a.percent = this.swipePos;
    QCRM.moduleSwipe[this.name].stages.push(a);
    this.swipePos += 15
};
SugarBean.prototype.addMenu = function(a)
{
    if (!QCRM.moduleMenu[this.name]) {
        QCRM.moduleMenu[this.name] = {}
    }
    QCRM.moduleMenu[this.name].push(a)
};
SugarBean.prototype.get_entry = function(b, a)
{
    if (QCRM.OffLine) {
    } else {
        SugarQuery("get_entry", '{"session":"' + SugarSessionId + '","module_name":"' + this.name + '","id":"' + b + '","select_fields":"","link_name_to_fields_array":' + JSON.stringify(this.link_name_to_fields) + "}", a)
    }
};
SugarBean.prototype.set_entry = function(c, a, b)
{
    QCRM.set_entry(this.name, c, a, b)
};
SugarBean.prototype.get_entry_list = function(d, a, c, g, b, e, h)
{
    QCRM.get_entry_list(this.name, d, a, c, g, b, e, h)
};
SugarBean.prototype.StoreFields = function(g, b)
{
    var a;
    if (this.StoreFieldsSaved.length > 0) {
        a = this.StoreFieldsSaved
    } else {
        var h = ["assigned_user_id", "date_entered", "date_modified"];
        if (this.name != "Favorites") {
            h.push("assigned_user_name")
        }
        a = this.AllFields().concat(this.RelateFields(true));
        for (var d in h) {
            if (a.indexOf(h[d]) === -1) {
                a.push(h[d])
            }
        }
        this.StoreFieldsSaved = a
    }
    this.CurrentData = {};
    a = a.concat(["jjwg_maps_geocode_status_c", "jjwg_maps_address_c", "jjwg_maps_lat_c", "jjwg_maps_lng_c"]);
    for (var c in a) {
        var e = a[c];
        if (g[e]) {
            this.CurrentData[e] = g[e]
        }
    }
    this.CurrentName = b;
    this.CurrentParentType = "";
    if (this.DefaultParent) {
        if (g[this.DefaultParent.field]) {
            this.CurrentParentName = g[this.DefaultParent.field].value
        }
        if (g[this.DefaultParent.id_name]) {
            this.CurrentParentId = g[this.DefaultParent.id_name].value
        }
        if (g[this.DefaultParent.module]) {
            this.CurrentParentType = g[this.DefaultParent.module].value
        }
    }
};
SugarBean.prototype.AllFields = function()
{
    if (this.AllFieldsSaved.length > 0) {
        return this.AllFieldsSaved
    }
    var e, h, c = this.TitleFields.concat(this.Fields), a;
    if (this.Addresses !== undefined) {
        for (var h in this.Addresses) {
            var d = this.Addresses[h];
            for (var g in QCRM.addressFields) {
                c.push(d + "_address_" + QCRM.addressFields[g])
            }
        }
    }
    a = this.AdditionalFields.concat(this.SearchFields, this.basic_search, this.DetailFields || []);
    for (h in a) {
        e = a[h];
        if (e.substring(0, 4) === "$ADD") {
            var d = e.substring(4);
            for (var g in QCRM.addressFields) {
                var b = d + "_address_" + QCRM.addressFields[g];
                c.push(b)
            }
        } else {
            c.push(e)
        }
    }
    c = Array_unique(c);
    this.AllFieldsSaved = c;
    return c
};
SugarBean.prototype.AllOrderFields = function()
{
    var a = this.AllFields(), b = [];
    for (var d in a) {
        if (sugar_mod_fields[this.name][a[d]] === undefined) {
            continue
        }
        var c = sugar_mod_fields[this.name][a[d]].type;
        if (c && c !== "relate" && c !== "email" && c !== "bool" && c !== "parent") {
            b.push(a[d])
        }
    }
    return b
};
SugarBean.prototype.HasAddress = function()
{
    if (this.Addresses !== undefined && this.Addresses[0] !== undefined) {
        return true
    }
    for (var b in this.AdditionalFields) {
        var a = this.AdditionalFields[b];
        if (a.substring(0, 4) === "$ADD") {
            return true
        }
    }
    return false
};
SugarBean.prototype.AllEditFields = function()
{
    var b = this.TitleFields.concat(this.Fields), a;
    a = this.EditFields || this.AdditionalFields;
    for (var g in a) {
        var d = a[g];
        if (d.substring(0, 4) === "$ADD") {
            var c = d.substring(4);
            for (var e in QCRM.addressFields) {
                b.push(c + "_address_" + QCRM.addressFields[e])
            }
        } else {
            if (this.EditExcluded.indexOf(d) === -1) {
                b.push(d)
            }
        }
    }
    return Array_unique(b)
};
SugarBean.prototype.RelateFields = function(d)
{
    var g, h, b = this.AllFields().slice();
    if (d) {
        if (this.DefaultRelate) {
            g = this.DefaultRelate.field;
            if (b.indexOf(g) === -1) {
                b.push(g)
            }
        }
        if (this.DefaultParent) {
            g = this.DefaultParent.field;
            if (b.indexOf(g) === -1) {
                b.push(g)
            }
        }
    }
    var c = [];
    for (var e in b) {
        g = b[e];
        h = sugar_mod_fields[this.name][g];
        if (h === undefined) {
        } else {
            if (h.type === "relate") {
                if (h.id_name !== undefined && h.id_name !== g) {
                    c.push(h.id_name)
                }
            } else {
                if (h.type === "parent") {
                    c.push(h.id_name);
                    c.push(h.id_type)
                }
            }
        }
    }
    return c
};
SugarBean.prototype.ListFieldsToSelect = function(b)
{
    var a = this.ListFields.concat(this.name == "Users" ? [] : ["assigned_user_id"], this.RelateFields(false));
    if (b !== undefined) {
        if (typeof b === "string") {
            if (b !== "") {
                b = b.split(" ")[0];
                a = a.concat([b])
            }
        } else {
            a = a.concat(b)
        }
    }
    a = a.filter(function(e, d, c)
    {
        return c.indexOf(e) === d
    });
    return '["' + a.join('","') + '"]'
};
SugarBean.prototype.Enabled = function()
{
    var a = this.name;
    return (QCRM.beans.indexOf(a) !== -1 && this.access !== "none" && (!QCRM.OffLine || Pref.SyncModules[a].sync !== "None") && Pref.Disabled.indexOf(a) === -1)
};
function addEnteredVal(e, c, h, d)
{
    var b = QCRM.toDBField(c, h, d), g = sugar_mod_fields[c][h], a = "";
    if (g.type === "relate") {
        if (Beans[g.module] === undefined) {
            e[g.id_name] = {name: g.id_name, value: b};
            e[h] = {name: h, value: SimpleBeans[g.module].List[b]}
        } else {
            e[h] = {name: h, value: b};
            if (b != "") {
                a = QCRM.toDBField(c, g.id_name, d)
            }
            e[g.id_name] = {name: g.id_name, value: a}
        }
    } else {
        if (g.type === "parent") {
            e[h] = {name: h, value: b};
            if (b != "") {
                a = QCRM.toDBField(c, g.id_name, d)
            }
            e[g.id_type] = {name: g.id_type, value: QCRM.toDBField(c, g.id_type, d)};
            e[g.id_name] = {name: g.id_name, value: a}
        } else {
            if ((g.type === "enum" || g.type === "dynamicenum") && b === "EMPTY") {
                b = ""
            }
            if (b !== undefined) {
                e[h] = {name: h, value: b}
            }
        }
    }
}
SugarBean.prototype.EditValues = function(d)
{
    var h, c = this.name, l = this.AllEditFields().concat(this.RelateFields(false)), b = {}, g = true, n = (this.DefaultRelate ? this.DefaultRelate.field : ""), q = (this.DefaultParent ? this.DefaultParent.field : ""), p = true, m = true, o, a = toDBDateTime(new Date());
    if (this.CurrentId === "") {
        b.date_entered = {name: "date_entered", value: a}
    } else {
        b = this.CurrentData
    }
    b.date_modified = {name: "date_modified", value: a};
    for (h in l) {
        var o = l[h], e = sugar_mod_fields[c][o];
        if (e === undefined || this.EditExcluded.indexOf(o) >= 0) {
            continue
        }
        if (o === "assigned_user_name") {
            g = false
        }
        if (o === n) {
            p = false
        }
        if (o === q) {
            m = false
        }
        addEnteredVal(b, c, o, d)
    }
    if (this.CurrentId === "") {
        if (g) {
            b.assigned_user_id = {name: "assigned_user_id", value: CurrentUserId}
        }
        if (this.DefaultRelate && p) {
            o = this.DefaultRelate.id_name;
            if (AttachTo === this.DefaultRelate.module) {
                b[o] = {name: o, value: Beans[AttachTo].CurrentId}
            } else {
                if (AttachTo === "Contacts" && this.DefaultRelate.module === "Accounts") {
                    b[o] = {name: o, value: Beans.Contacts.CurrentParentId}
                }
            }
        }
        if (AttachTo != "" && this.DefaultParent && m) {
            o = this.DefaultParent.id_name;
            if (AttachTo === "Contacts" && this.DefaultRelate && this.DefaultRelate.module === "Contacts") {
                b[o] = {name: o, value: Beans[AttachTo].CurrentParentId};
                b[this.DefaultParent.module] = {name: this.DefaultParent.module, value: "Accounts"}
            } else {
                b[this.DefaultParent.id_name] = {name: this.DefaultParent.id_name, value: $("#" + c + "FromId").val()};
                b[this.DefaultParent.module] = {
                    name: this.DefaultParent.module,
                    value: $("#" + c + "FromModule").val()
                };
                b[this.DefaultParent.field] = {name: this.DefaultParent.field, value: $("#" + c + "FromName").val()}
            }
        }
    }
    $.extend(b, this.CustomValues(b, this.CurrentId === ""));
    for (h in this.hooks.before_save) {
        this.hooks.before_save[h](b, this.CurrentId === "" ? {} : CurrentRecordValues)
    }
    return b
};
function refreshPage()
{
    currentPage = window.location.hash.substr(1);
    $("body").pagecontainer("change", "#" + currentPage, {allowSamePageTransition: true})
}
SugarBean.prototype.Edit = function(z, h, l)
{
    var d = (this.CurrentId === ""), p = [], q = z === "" ? {} : Beans[z].CurrentData;
    if (mobile_edition == "Pro" || this.available_CE) {
        if (this.CheckEdit(d ? {} : CurrentRecordValues)) {
            if (this.CheckDuplicates) {
                $("#" + module + "Dup").hide()
            }
            $.mobile.loading("show");
            this.CurrentSearch = false;
            var g = {}, m = this.name + (this.fullPage ? "DP" : "ListPage"), s = $("body").pagecontainer("getActivePage").attr("id");
            g = {changeHash: false};
            $("body").pagecontainer("change", "#Edit" + this.name, g);
            AttachTo = z;
            var n = this.AllEditFields(), w = this.name;
            for (var u in n) {
                var b = n[u], o = sugar_mod_fields[this.name][b], c = "#Edit" + w + "_", v = c + b, a, e;
                if (!o) {
                    return
                }
                a = c + o.id_name;
                init_form_field(w, b, "", d, CurrentRecordValues, c, z);
                if (o !== undefined && o.source !== "non-db" && o.type === "relate" && Beans[o.module] !== undefined && o.id_name !== b) {
                    if (o.module === "Accounts") {
                        $("#" + w + b + "CG").hide()
                    }
                    if (d && b !== "assigned_user_name") {
                        if (z === o.module) {
                            $(v).val(HTMLDecode(Beans[z].CurrentName));
                            $(a).val(Beans[z].CurrentId);
                            if (o.copyfields !== undefined) {
                                p = p.concat(o.copyfields)
                            }
                        } else {
                            if (h !== "" && o.module === "Accounts") {
                                $(v).val(HTMLDecode(l));
                                $(a).val(h)
                            } else {
                                $(v).val("");
                                $(a).val("")
                            }
                        }
                    }
                    $("#" + w + b + "L").html("").listview("refresh")
                } else {
                    if (o !== undefined && o.source !== "non-db" && o.type === "parent") {
                        e = c + o.id_type;
                        if (d) {
                            if (AttachTo === "") {
                                $(v).val("");
                                $(a).val("");
                                $(e).val("Accounts")
                            } else {
                                if (AttachTo === "Accounts" && l != "") {
                                    $(v).val(l);
                                    $(a).val(h);
                                    $(e).val(AttachTo)
                                } else {
                                    if (AttachTo !== "Contacts" || l === "") {
                                        $(v).val(HTMLDecode(getFromTemplate(w, CurrentRecordValues, Beans[AttachTo].TitleTpl)));
                                        $(a).val(Beans[AttachTo].CurrentId);
                                        $(e).val(AttachTo)
                                    } else {
                                        $(v).val(HTMLDecode(l));
                                        $(a).val(h);
                                        $(e).val("Accounts")
                                    }
                                }
                                if (o.copyfields && o.copyfields[AttachTo]) {
                                    p = p.concat(o.copyfields[AttachTo])
                                }
                            }
                            $(e).selectmenu("refresh")
                        }
                        $("#" + w + b + "L").html("").listview("refresh")
                    }
                }
            }
            if (z !== "") {
                CopyFieldsFromRelated(p, q, c, w)
            }
            this.EditHook(d, z, d ? {} : CurrentRecordValues);
            for (var r in this.hooks.before_edit) {
                this.hooks.before_edit[r](d ? {} : CurrentRecordValues, d)
            }
            $.mobile.loading("hide")
        }
    } else {
        AlertPopup(RES_UNAVAILABLE)
    }
};
SugarBean.prototype.Update = function(g, b)
{
    var d = this, e = "#" + this.name, a = (g === "") || (g === this.CurrentId && (CurrentRecordValues.module === this.name));

    function c()
    {
        var h;
        d.UpdateBtnHook();
        $(e + "FromModule").val(d.CurrentParentType);
        $(e + "FromLnk").val("");
        $(e + "FromId").val(d.CurrentParentId);
        $(e + "FromName").val(d.CurrentParentName);
        $(e + "parentJJWG").val("");
        d.Edit("", "", "");
        for (h in d.hooks.before_update) {
            d.hooks.before_update[h](g, CurrentRecordValues)
        }
    }

    PrevID = false;
    $(e + "PrevPage").val(b || (d.name + (d.fullPage ? "DP" : "ListPage")));
    if (!a) {
        $.mobile.loading("show");
        this.get_entry(g, function(h)
        {
            $.mobile.loading("hide");
            if (h) {
                d.CurrentId = g;
                d.CurrentParentId = "";
                d.CurrentParentName = "";
                d.CurrentParentType = "";
                CurrentRecordValues = h.entry_list[0].name_value_list;
                CurrentRecordValues.module = d.name;
                CurrentRecordLinks = [];
                if (h.relationship_list && h.relationship_list[0] && h.relationship_list[0].link_list) {
                    CurrentRecordLinks = h.relationship_list[0].link_list
                }
                c(g)
            }
        })
    } else {
        c()
    }
};
SugarBean.prototype.Duplicate = function(b)
{
    var a = this;
    if (b) {
        this.CurrentId = b
    }
    PrevID = b;
    if (CurrentRecordValues.id) {
        CurrentRecordValues.id.value = ""
    }
    this.Update(this.CurrentId);
    setTimeout(function()
    {
        a.CurrentId = ""
    }, 800)
};
SugarBean.prototype.Create = function(g, e, b)
{
    var c, m, h = "", d, a = "", n = "", l = "";
    for (m in HiddenFields) {
        $("#" + this.name + HiddenFields[m]).val("")
    }
    PrevID = false;
    if ($("body").pagecontainer("getActivePage").attr("id") == (this.name + "DP")) {
        PrevID = this.CurrentId
    }
    if (g && g != "") {
        d = Beans[g];
        h = d.CurrentId;
        a = d.CurrentName;
        $("#" + this.name + "PrevPage").val(g + (d.fullPage ? "DP" : "ListPage"));
        $("#" + this.name + "FromModule").val(g);
        $("#" + this.name + "FromLnk").val(e);
        $("#" + this.name + "FromId").val(h);
        $("#" + this.name + "FromName").val(d.CurrentName);
        if (g === "Contacts") {
            n = d.CurrentParentId;
            l = d.CurrentParentName
        } else {
            if (g === "Accounts") {
                n = h;
                l = d.CurrentName
            }
        }
        $("#" + this.name + "FromAccountId").val(n);
        this.CurrentParentType = g;
        this.CurrentParentId = h;
        this.CurrentParentName = d.CurrentName
    } else {
        g = "";
        $("#" + this.name + "PrevPage").val(b || (this.name + "ListPage"));
        this.CurrentParentType = "";
        this.CurrentParentId = "";
        this.CurrentParentName = ""
    }
    this.CurrentId = "";
    this.CurrentName = "";
    this.Edit(g, n, l);
    this.CreateBtnHook();
    for (c in this.hooks.before_create) {
        this.hooks.before_create[c](g, h, a, e)
    }
};
QCRM.finalSave = function(e, d, c, b, a)
{
    e.set_entry(e.CurrentId, d, function(q)
    {
        if (!q || q.id === undefined) {
            var m = "Save Error. Please check your server log";
            $.mobile.loading("hide");
            if (q && q.name !== undefined) {
                if (q.name === "Access Denied") {
                    m = RES_ACCESS_DENIED_MSG
                } else {
                    m = q.name
                }
            }
            AlertPopup(m);
            return
        }
        var o, h = e.CurrentId === "", u = Beans[c];
        var l = e.name, p = e.AllEditFields(), g = false;
        if (e.LastViewed) {
            PushViewed(l, q.id, e.DisplayTitle(d))
        }
        for (var o in p) {
            var s = p[o], n = sugar_mod_fields[l][s], r;
            if (n && n.after_save) {
                r = n.after_save(q.id, d);
                g = r || g
            }
        }
        if (c !== "" && a !== "" && u && b !== "") {
            QCRM.set_relationship(c, b, a, q.id);
            if (QCRM.OffLine && u.Links[a].backlink) {
                QCRM.set_relationship(e.name, q.id, u.Links[a].backlink, b)
            }
        }
        e.AfterSave(q.id, h, d);
        for (o in e.hooks.after_save) {
            e.hooks.after_save[o](q.id, h, d)
        }
        e.CurrentId = q.id;
        setTimeout(function()
        {
            $.mobile.loading("hide");
            e.AfterSaveLandingPage(q.id, h)
        }, g ? 8000 : 100)
    })
};
SugarBean.prototype.CheckForm = function()
{
    var b = this.name, g = this.AllEditFields(), l = "#Edit" + b + "_", n = "", h = 0, a = {};
    for (var e in g) {
        var m = g[e], c = $(l + m).val();
        var d = checkFormField(b, m, l);
        if (d !== "") {
            if (h > 0) {
                n += "\r"
            }
            h += 1;
            n += d
        } else {
            a[m] = c
        }
    }
    if (h > 0) {
        AlertPopup(n)
    } else {
        n = this.CustomCheck(a);
        if (n !== "") {
            h += 1;
            AlertPopup(n)
        }
    }
    return h
};
SugarBean.prototype.Save = function()
{
    var g = this, o = g.EditValues("#Edit" + g.name + "_"), e = $("#" + this.name + "FromLnk").val(), l = $("#" + this.name + "FromId").val(), a = $("#" + this.name + "FromModule").val(), d, n;
    if (this.CheckForm() > 0) {
        return
    }
    $.mobile.loading("show");
    if (mobile_edition == "Pro" && QCRM.JJWG && JJWG.modules.indexOf(g.name) != -1) {
        if (a != "" && g.CurrentId === "" && (g.name == "Meetings" || g.name == "Opportunities")) {
            if (JJWG.modules.indexOf(a) != -1) {
                d = Beans[a];
                if (d.CurrentId == l) {
                    n = d.CurrentData;
                    if (n.jjwg_maps_geocode_status_c && n.jjwg_maps_geocode_status_c.value === "OK") {
                        o.jjwg_maps_geocode_status_c = n.jjwg_maps_geocode_status_c;
                        o.jjwg_maps_address_c = n.jjwg_maps_address_c;
                        o.jjwg_maps_lat_c = n.jjwg_maps_lat_c;
                        o.jjwg_maps_lng_c = n.jjwg_maps_lng_c
                    }
                }
            }
        } else {
            if (!o.jjwg_maps_geocode_status_c || (o.jjwg_maps_geocode_status_c.value != "OK" && o.jjwg_maps_geocode_status_c.value != "APPROXIMATE")) {
                var m = "";
                if (g.template == "person") {
                    m = "primary"
                } else {
                    if (g.template == "company") {
                        m = "billing"
                    }
                }
                if (m != "") {
                    var c = address_values(o, g.name, m);
                    if (c.google !== "") {
                        try {
                            QCRM.geocoder.geocode({address: c.google}, function(q, p)
                            {
                                if (p == google.maps.GeocoderStatus.OK && q[0].geometry.location_type == "ROOFTOP") {
                                    o.jjwg_maps_geocode_status_c = {name: "jjwg_maps_geocode_status_c", value: "OK"};
                                    o.jjwg_maps_lat_c = {name: "jjwg_maps_lat_c", value: q[0].geometry.location.lat()};
                                    o.jjwg_maps_lng_c = {name: "jjwg_maps_lng_c", value: q[0].geometry.location.lng()};
                                    o.jjwg_maps_address_c = {name: "jjwg_maps_address_c", value: q[0].formatted_address}
                                }
                                QCRM.finalSave(g, o, a, l, e)
                            });
                            return
                        } catch (b) {
                        }
                    }
                } else {
                    var h = $("#" + g.name + "parentJJWG").val();
                    if (h) {
                        JJWG.decodeFields(g.name, g.name + "parentJJWG", o)
                    }
                }
            }
        }
    }
    QCRM.finalSave(g, o, a, l, e)
};
SugarBean.prototype.ViewDetails = function()
{
    var g = this, d = "#" + g.name + "DetailsList", a = d, c = "#" + this.name + "NameH1", b = $("#" + this.name + "Links");

    function e(l, h, m)
    {
        if (l === "deleted") {
            AlertPopup(sugar_app_strings.ERROR_NO_RECORD)
        } else {
            if (l === "Access Denied") {
                AlertPopup(RES_ACCESS_DENIED_MSG)
            } else {
                AlertPopup(sugar_app_strings.ERROR_NO_RECORD)
            }
        }
        RemoveFromLastviewed(h, m);
        RemoveFromFavorites(h, m);
        g.CurrentId = ""
    }

    QCRM.IEsavedContents = "";
    if (!init_done) {
        MobileInit();
        return
    }
    $(d + " li").remove();
    b.hide();
    if (!this.fullPage) {
        $(c).parent().hide()
    } else {
        $(c).html(sugar_app_list_strings.moduleListSingular[this.name])
    }
    if (this.CurrentId == "") {
        if (PrevID) {
            this.CurrentId = PrevID
        } else {
            return
        }
    }
    $(a).data("identity", this.CurrentId);
    $.mobile.loading("show");
    this.get_entry(this.CurrentId, function(p)
    {
        if (p) {
            if (p.name !== undefined) {
                e(p.name, g.name, p.id, g.CurrentId);
                return
            } else {
                if (p.entry_list !== undefined && p.entry_list[0] !== undefined) {
                    var u = [];
                    CurrentRecordLinks = [];
                    if (p.relationship_list && p.relationship_list[0]) {
                        u = p.relationship_list[0];
                        if (p.relationship_list[0].link_list) {
                            CurrentRecordLinks = p.relationship_list[0].link_list
                        }
                    }
                    p = p.entry_list[0];
                    CurrentRecordValues = p.name_value_list;
                    CurrentRecordValues.module = g.name;
                    edit_data = CurrentRecordValues;
                    if (CurrentRecordValues[1] !== undefined && CurrentRecordValues[1].name !== undefined) {
                        e(CurrentRecordValues[1].name, g.name, p.id, g.CurrentId);
                        return
                    }
                    if (CurrentRecordValues.edit_access !== undefined) {
                        enableMenuAction("editcurrent", CurrentRecordValues.edit_access);
                        var n = CurrentRecordValues.edit_access;
                        if (CurrentRecordValues.delete_access !== undefined) {
                            n = CurrentRecordValues.delete_access
                        }
                        enableMenuAction("delcurrent", n)
                    }
                    var h, o = g.DisplayTitle(CurrentRecordValues);
                    g.StoreFields(CurrentRecordValues, o);
                    $(c).html(o);
                    if (!g.fullPage) {
                        $(c).parent().show()
                    }
                    if (g.LastViewed) {
                        PushViewed(g.name, g.CurrentId, o)
                    }
                    showFavoriteStatus(g.name, g.CurrentId, o);
                    for (h in g.hooks.after_retrieve) {
                        g.hooks.after_retrieve[h](CurrentRecordValues)
                    }
                    g.ViewDetailsHook(CurrentRecordValues);
                    g.ViewDetailsHdrHook(CurrentRecordValues);
                    var q = $('<li data-role="list-divider">' + RES_OVERVIEW_LABEL + "</li>");
                    for (h in g.hooks.before_display) {
                        g.hooks.before_display[h](CurrentRecordValues, $(a))
                    }
                    $(a).append(q);
                    q.click(function()
                    {
                        QCRM.showEmptyFields = !QCRM.showEmptyFields;
                        if (QCRM.showEmptyFields) {
                            $(a + " li[isempty='1']").show()
                        } else {
                            $(a + " li[isempty='1']").hide()
                        }
                    });
                    if (typeof g.ViewDetailsCustom === "function") {
                        g.ViewDetailsCustom(CurrentRecordValues, a)
                    } else {
                        displayFields(p.name_value_list, g.name, g.DetailFields || g.EditFields || g.TitleFields.concat(g.AdditionalFields), a)
                    }
                    for (h in g.hooks.actions) {
                        var m = g.hooks.actions[h];
                        if (m.show) {
                            m.show(CurrentRecordValues)
                        }
                    }
                    g.ViewDetailsFtrHook(CurrentRecordValues, a);
                    for (h in g.hooks.after_display) {
                        g.hooks.after_display[h](CurrentRecordValues, $(a), u)
                    }
                    $(a).listview("refresh");
                    var q = $("#" + g.name + "DetailsHdr");
                    if ($.trim(q.html()) != "") {
                        q.show()
                    } else {
                        q.hide()
                    }
                    b.show();
                    var s = g.CustomLinks || g.Links;
                    for (var l in s) {
                        var r = (g.CustomLinks && g.CustomLinks[0] !== undefined) ? s[l] : l;
                        getRelatedList(g.name, r)
                    }
                }
            }
        }
    });
    $.mobile.loading("hide")
};
SugarBean.prototype.CustomListStyle = function(n, c)
{
    if (this.ColoredField !== "") {
        var e = this.ColoredField, d = this.CustomColors, g = sugar_mod_fields[this.name][e];
        if (d.length === 0) {
            d = (g && g.options !== undefined) ? ListColors : ListColorsBool
        }
        if (e === "assigned_user_id") {
            return ((true ? "background-color:" : "background:") + d[(n.assigned_user_id.value === CurrentUserId) ? 1 : 0] + ";")
        } else {
            if (n[e] !== undefined) {
                var b = n[e].value, l = 0;
                if ((g.type === "bool" || g.type === "boolean")) {
                    l = (b === 1 || b === "1") ? 1 : 0
                } else {
                    var m = sugar_app_list_strings[g.options], h = 0;
                    if (m === undefined) {
                        return ""
                    }
                    for (var a in m) {
                        if (a === b) {
                            l = h;
                            break
                        }
                        h++
                    }
                }
                return (true ? "background-color:" : "background:") + d[l % d.length] + ";"
            }
        }
    }
    return ""
};
$(window).on("orientationchange", function(b)
{
    if (QCRM.beans) {
        for (var a in QCRM.beans) {
            if ($("body").pagecontainer("getActivePage").attr("id") == (QCRM.beans[a] + "ListPage")) {
                changeHeight(QCRM.beans[a]);
                break
            }
        }
    }
});
function changeHeight(a)
{
    function b()
    {
        if (QCRM.ScrollLists && QCRM.mode === "tablet" && !Beans[a].fullPage) {
            try {
                var c = $(window).height(), g = screen.height > screen.width;
                if (QCRM.platform == "android") {
                    if (g) {
                        if ($(window).width() > c) {
                            c = $(window).width()
                        }
                    } else {
                        if ($(window).width() < c) {
                            c = $(window).width()
                        }
                    }
                }
                var e = c - $("#" + a + 'ListPage [data-role="footer"]').height() - $("#" + a + 'ListPage [data-role="header"]').height();
                $("#" + a + "GR").height(e);
                $("#" + a + "GL").height(e);
                $("#" + a + "Panel").height(c);
                if (QCRM.platform == "android") {
                    $(".ui-footer-fixed").css("visibility", "visible")
                }
            } catch (d) {
            }
        }
    }

    if (QCRM.platform == "android") {
        setTimeout(function()
        {
            b()
        }, 200)
    } else {
        b()
    }
}
SugarBean.prototype.GetList = function(p)
{
    if (!init_done) {
        MobileInit();
        return
    }
    var d = this.name, c = this, r = (QCRM.mode === "tablet" && !Beans[d].fullPage), n = "#" + d + "ListDiv", s = $(n), h = "#" + d + "Grid", q = sugar_app_list_strings.moduleList[c.name], b = $("#" + d + "ListPageTitle"), g = "", e = "", m, l;
    if (this.CurrentSearchOrder && this.CurrentSearchOrder !== "") {
        m = this.CurrentSearchOrder.split(" ");
        e = m[0]
    }
    if (this.CurrentSearchValues == "") {
        LoadLastSearch(d)
    }
    g = get_where(d, this.CurrentSearchValues);
    changeHeight(d);
    if (g !== this.CurrentSearch) {
        p = 0;
        this.NextOffset = 0;
        this.PrevOffset = 0;
        this.CurrentOffset = 0
    }
    this.CurrentSearch = g;
    $.mobile.loading("show");
    if (r) {
        $(s).empty()
    } else {
        $(n + " li").remove()
    }
    this.CurrentOffset = p;
    enableButton(d + "PreviousBtn", p > 0);
    this.get_entry_list(g, this.ListFieldsToSelect(e), this.link_phone_fields, p, RowsPerPage, (this.CurrentSearchOrder && this.CurrentSearchOrder !== "") ? this.CurrentSearchOrder : this.OrderBy, function(A)
    {
        if (A && A.entry_list !== undefined) {
            if (A.result_count !== 0 && A.next_offset === 0) {
                c.CurrentOffset = 0
            }
            if (A.next_offset === 0 || A.result_count === 0) {
                s.append("<li>" + RES_NO_MORE_RECORDS + "</li>")
            } else {
                if (A.total_count !== undefined && A.total_count !== -1) {
                    var z = 1 + c.CurrentOffset;
                    var w = c.CurrentOffset + A.result_count;
                    q += " (" + z.toString() + "-&shy;" + w.toString() + "/" + A.total_count.toString() + ")";
                    enableButton(c.name + "NextBtn", A.next_offset < A.total_count)
                }
                c.NextOffset = A.next_offset;
                c.PrevOffset = p - RowsPerPage;
                if (c.PrevOffset < 0) {
                    c.PrevOffset = 0
                }
            }
            b.html(q);
            var a = 0;
            for (a = 0; a < A.entry_list.length; a++) {
                var v = A.entry_list[a], o = v.module_name, u;
                if (r) {
                    u = AddLinkTablet(o, v.id, v.name_value_list)
                } else {
                    u = AddLinkWithIcon(o, v.id, "", v.name_value_list, (A.relationship_list && A.relationship_list[a] && A.relationship_list[a].link_list) ? A.relationship_list[a].link_list : [], c.name + "ListPage", false, "")
                }
                s.append(u)
            }
            s.listview("refresh");
            if (mobile_app) {
            }
        }
        $.mobile.loading("hide")
    })
};
SugarBean.prototype.InitEditForm = function()
{
    init_add_form(this.name, this.EditFields || this.TitleFields.concat(this.AdditionalFields), this.EditExcluded.concat(this.FooterFields || []));
    if (this.FooterFields) {
        init_add_form(this.name, this.FooterFields, this.EditExcluded, "#Edit" + module + "Ftr")
    }
};
SugarBean.prototype.DisplaySubpanelRecord = function(g, c, a, d, e)
{
    var b = (e && Beans[d].Links[e].template !== undefined) ? getFromTemplate(this.name, c, Beans[d].Links[e].template) : "";
    return AddLinkWithIcon(this.name, g, b, c, [], a, false, d, e)
};
SugarBean.prototype.DisplayTitle = function(b)
{
    return getFromTemplate(this.name, b, this.TitleTpl)
};
SugarBean.prototype.DisplayTitleExtended = function(b)
{
    var c = this.ExtendedTitleTpl === undefined ? this.TitleTpl : this.ExtendedTitleTpl;
    return getFromTemplate(this.name, b, c)
};
SugarBean.prototype.UpdateTitleField = function(a, b)
{
    this.SearchName = b;
    this.TitleFields = a;
    this.TitleTpl = "{'" + a.join("'} {'") + "'}"
};
SugarBean.prototype.DisplaySubpanelFilter = function(b)
{
    return ""
};
SugarBean.prototype.ViewDetailsHook = function(a)
{
};
SugarBean.prototype.ViewDetailsHdrHook = function(a)
{
};
SugarBean.prototype.ViewDetailsFtrHook = function(a)
{
};
SugarBean.prototype.EditHook = function(a, c, b)
{
};
SugarBean.prototype.CustomCheck = function(a)
{
    var c, b, d = "";
    for (c in this.hooks.check_before_save) {
        b = this.hooks.check_before_save[c](a);
        if (b != "") {
            d += "\r" + b
        }
    }
    return d
};
SugarBean.prototype.CheckEdit = function(c)
{
    var a, b = false;
    if (this.access === "edit" && this.acl.edit) {
        b = true;
        for (a in this.hooks.check_edit) {
            if (!this.hooks.check_edit[a](c)) {
                return false
            }
        }
    }
    return b
};
SugarBean.prototype.CheckDelete = function(c)
{
    var a, b = false;
    if (this.access === "edit" && this.acl.del) {
        b = true;
        for (a in this.hooks.check_delete) {
            if (!this.hooks.check_delete[a](c)) {
                return false
            }
        }
    }
    return b
};
SugarBean.prototype.AfterDelete = function(a)
{
};
SugarBean.prototype.AfterSave = function(c, a, b)
{
};
SugarBean.prototype.AfterSaveLandingPage = function(e, a)
{
    var b = this.name, c = $("#" + b + "PrevPage").val(), d = c.replace("ListPage", "");
    if (a && QCRM.mode === "mobile" && d === this.name) {
        c = d + "DP"
    }
    $.mobile.back();
    return
};
SugarBean.prototype.CustomValues = function(b, a)
{
    return {}
};
function SugarSimpleBean(a, b, c, d)
{
    this.name = a;
    this.table = b;
    this.DefValue = "";
    this.query = c;
    this.OrderBy = d === undefined ? "" : d;
    this.Fields = ["name"];
    this.link_fields = "";
    this.List = {};
    this.Columns = [];
    this.ListFields = ["name"];
    this.ListViewTpl = "<h4>{name}</h4>";
    this.TitleTpl = "{name}";
    this.swipeType = "noswipe";
    this.Enabled = function()
    {
        return true
    };
    this.ListFieldsToSelect = function()
    {
        return '["' + this.ListFields.concat(["id"]).join('","') + '"]'
    };
    this.DisplaySubpanelFilter = function(e)
    {
        return ""
    };
    this.DisplaySubpanelElt = function(e)
    {
        return getFromTemplate(this.name, e, this.ListViewTpl)
    };
    this.DisplayTitle = function(e)
    {
        return getFromTemplate(this.name, e, this.TitleTpl)
    };
    this.DisplayTitleExtended = this.DisplayTitle;
    this.AfterLoad = function(e)
    {
    };
    this.search = function(h, m)
    {
        var g = [], l, e = this.List;
        h = h.toUpperCase();
        for (l in e) {
            if (e[l].toUpperCase().indexOf(h) !== -1) {
                g.push({id: l, name_value_list: {id: {name: "id", value: l}, name: {name: "name", value: e[l]}}})
            }
        }
        m({entry_list: g})
    }
}
SugarSimpleBean.prototype.Load = function(b)
{
    var a = this;
    QCRM.get_S_entry_list(this.name, this.query, this.Fields, this.link_fields, 0, 500, this.OrderBy, function(n)
    {
        if (n) {
            if (n.entry_list != undefined) {
                var e, h;
                for (e = 0; e < n.entry_list.length; e++) {
                    var m = n.entry_list[e], l = "";
                    for (h = 0; h < a.Fields.length; h++) {
                        var g = a.Fields[h];
                        if (m.name_value_list[g] !== undefined) {
                            l += (l !== "" ? " " : "") + m.name_value_list[g].value
                        }
                    }
                    a.List[m.id] = l
                }
                b(n)
            }
        }
    })
};
QCRM.enableBeans = function(n)
{
    var d, b, l, h = ((mobile_edition === "Pro" && QCRM.mode !== "tablet") ? "true" : "false");

    function w(m)
    {
        var z = '<a data-link="clearsearch" href="#" ' + button_defaults + ' data-theme="c">' + RES_CLEAR + '</a><a data-link="search" data-rel="close" data-theme="b" href="#" ' + button_defaults + ">" + sugar_app_strings.LBL_SEARCH_BUTTON_LABEL + "</a>";
        return '<form class="searchsubmit" id="SForm' + m + '" data-ajax="false" data-module="' + m + '"><div id="' + m + 'basic_search"></div><div id="' + m + 'DivMoreOptions" data-role="collapsible" data-collapsed="' + h + '" data-theme="d"><h3>' + RES_OPTIONS + '</h3><div name="' + m + 'MyItemsOption" class="ui-field-contain"><div data-role="controlgroup" data-mini="true"><input type="checkbox" name="' + m + 'MyItems" id="' + m + 'MyItems" class="custom" data-theme="c" ><label for="' + m + 'MyItems">' + sugar_app_strings.LBL_CURRENT_USER_FILTER + '</label></div></div></div><div id="' + m + 'SS" style="display: none;"></div><div class="CenterBtns" style="margin-top:10px;"><input type="hidden" id="' + m + 'SI" value="0">' + z + '</div><input type="submit" style="opacity:0;" data-role="none"></form>'
    }

    PagesCreated = true;
    QCRM.beans = n.slice();
    for (b in Beans) {
        if (!Beans[b].fullPage) {
            Beans[b].fullPage = (QCRM.mode !== "tablet")
        }
    }
    if (sugar_app_strings.LBL_SAVED === undefined) {
        sugar_app_strings.LBL_SAVED = "Saved"
    }
    if (typeof sugar_mod !== "undefined") {
        for (d in n) {
            b = n[d];
            if (Beans[b] === undefined) {
                l = "";
                if (sugar_mod[b].icon !== undefined) {
                    l = sugar_mod[b].icon
                }
                Beans[b] = new SugarBean(b, sugar_mod[b].table, sugar_mod[b].type, sugar_mod[b].custom, l)
            }
            if (b !== "Employees") {
                Beans[b].access = "edit"
            }
            Beans[b].hasIconClass = true
        }
        for (d in n) {
            b = n[d];
            if (sugar_mod[b] && sugar_mod[b].links !== undefined) {
                for (var p in sugar_mod[b].links) {
                    if (Beans[b].Links[p] === undefined) {
                        var a = sugar_mod_fields[b];
                        var o = sugar_mod[b].links[p], g = false, c;
                        if ((typeof o) !== "string") {
                            o = sugar_mod[b].links[p].module;
                            g = sugar_mod[b].links[p].id_name;
                            for (c in a) {
                                if (a[c].type === "relate") {
                                    if (a[c].id_name === g) {
                                        sugar_mod_fields[b][c].ass_link = p
                                    }
                                }
                            }
                        }
                        Beans[b].Links[p] = new SugarLink(p, b, o, g, (o !== "Accounts" && o !== "Documents" && o !== "Emails"), (o !== "Emails"), false)
                    }
                }
                for (p in Beans[b].Links) {
                    if (Beans[b].Links[p].SyncFollow === undefined) {
                        Beans[b].Links[p].SyncFollow = true
                    }
                }
            }
        }
    }
    for (d in n.reverse()) {
        b = n[d];
        if (b !== undefined && sugar_app_list_strings.moduleList[b] !== undefined) {
            if (!sugar_app_list_strings.moduleList[b]) {
                sugar_app_list_strings.moduleList[b] = b
            }
            var s = sugar_app_list_strings.moduleList[b];
            if ((s.length > (QCRM.mode === "mobile" ? 12 : 15)) && (s.indexOf(" ") === -1)) {
                s = '<span style="font-size: smaller;">' + s + "<span>"
            }
            $("<style type='text/css'> ." + b + "Icon{background-image:url('" + Beans[b].icon32 + "');background-repeat: no-repeat;} </style>").appendTo("head");
            $("<style type='text/css'> ." + b + "SIcon{background-image:url('" + Beans[b].icon32 + "');background-repeat: no-repeat;background-size: 16px 16px;font-size: 0.8em;background-position: 3px 50%;} </style>").appendTo("head");
            $("#HomeMenu").prepend('<li class="IconContainer" id="Icon' + b + '" style="display:none;"><a href="#' + b + 'ListPage"><div class="HomeIcon ' + b + 'Icon"/><div>' + s + "</div></a></li>")
        }
    }
    n.reverse();
    for (d in n) {
        if (Beans[n[d]] !== undefined && sugar_app_list_strings.moduleList[n[d]] !== undefined) {
            b = n[d];
            var r = QCRM.mode === "tablet" && !Beans[b].fullPage;
            var q = '<div class="' + b + 'DetailsHdr" id="' + b + 'DetailsHdr" style="display:none;margin-top:-1em;margin-bottom:1em"/><div><ul style="margin-bottom:0px" id="' + b + 'DetailsList" data-role="listview" data-divider-theme="b" data-split-theme="c" /></div><div class="' + b + 'DetailsFtr" id="' + b + 'DetailsFtr"></div><div style="clear:both;" id="' + b + 'Links"/>';
            var e = '<a id="' + b + 'Fav" data-link="favorite" data-mini="true" data-inline="true" data-iconpos="notext" class="' + b + 'Fav md-icon mbsc-ic mbsc-ic-star" style="display:none"/><h1 id="' + b + 'NameH1"/><a data-inline="true" id="' + b + 'ActMenu" data-icon="action" href="#PopupMenu' + b + '" data-history="false" data-rel="popup" data-iconpos="notext" class="ui-alt-icon ui-nodisc-icon ui-btn-right"/><div class="' + b + 'DetailsBtn" id="' + b + 'DetailsBtn"></div>';
            var v = '<div id="filters' + b + '"></div><ul id="' + b + 'ListDiv" data-role="listview" data-split-theme="d" data-filter="false" ' + (mobile_app ? "" : 'style="margin-top:0px !important" ') + (r ? 'data-icon="false" data-theme="d"' : "") + "/>";
            if (r) {
                v = '<div class="ui-grid-a" ><div class="ui-block-a listleft" id="' + b + 'GL" style="overflow-y: auto;-webkit-overflow-scrolling: touch;">' + v + '</div><div class="ui-block-b listright" id="' + b + 'GR" style="overflow-y: auto;">' + ('<div data-role="header" data-theme="d" class="ui-nodisc-icon" style="margin-left:-1em;margin-right:-1em;margin-top:-1em;margin-bottom:1em;display:none;background:none;">' + e + "</div>" + q).replace(/h1/, "h3") + "</div></div>"
            }
            $.mobile.pageContainer.append('<div id="' + b + 'ListPage" data-module="' + b + '" data-role="page" data-theme="d"><div data-role="panel" data-position="right" data-display="overlay" id="' + b + 'Panel" style="overflow-y: auto;">' + w(b) + '</div><div data-role="header" data-theme="d"><h1 id="' + b + 'ListPageTitle" style="text-shadow:none !important;"/><a href="#' + b + 'Panel" data-role="button" data-icon="search" data-iconpos="notext" data-iconshadow="false" class="ui-alt-icon ui-btn-right ui-nodisc-icon"></a></div><div data-role="content" data-theme="d" ' + (r ? ('style="padding: 0px !important;"') : 'style="padding-top: 0px !important;padding-bottom: 0px !important;"') + ">" + v + '</div><div id="' + b + 'lLegend"/>' + FooterDef + '<div data-role="navbar"><ul id="' + b + 'LFtr" data-module="' + b + '"><li><a data-link="previous" id="' + b + 'PreviousBtn" href="#" data-role="button" data-icon="arrow-l" class="ui-alt-icon ui-nodisc-icon"></a></li><li><a id="' + b + 'ListPageHomeBtn" href="#HomePage" data-role="button" data-icon="home" data-direction="reverse" class="ui-alt-icon ui-nodisc-icon"></a></li><li><a id="' + b + 'LBackBtn" href="#" data-role="button" data-icon="back" data-rel="back" class="ui-alt-icon ui-nodisc-icon"/></li><li><a data-link="create" id="' + b + 'ListPageAddBtn" href="#" data-role="button" data-icon="plus" class="ui-alt-icon ui-nodisc-icon"></a></li><li><a data-link="next" id="' + b + 'NextBtn" href="#" data-role="button" data-icon="arrow-r" class="ui-alt-icon ui-nodisc-icon"></a></li></ul></div></div></div>');
            if (Beans[b].fullPage) {
                $.mobile.pageContainer.append('<div id="' + b + 'DP" data-module="' + b + '" data-role="page" data-theme="d"><div data-role="header" data-theme="d">' + e + '</div><div data-role="content" data-theme="d"><div style="display:none;"><a id="IE' + b + '" href="#InlineEdit" >&nbsp;</a></div>' + q + "</div>" + FooterDef + '<div data-role="navbar"><ul data-module="' + b + '"><li><a id="' + b + 'HomeBtn" href="#HomePage" data-role="button" data-icon="home" data-direction="reverse" class="ui-alt-icon ui-nodisc-icon"/></li><li><a id="' + b + 'BackBtn" href="javascript:void(0)" data-role="button" data-icon="back" data-rel="back" data-direction="reverse" class="ui-alt-icon ui-nodisc-icon"/></li><li><a id="' + b + 'ListPageSearchBtn" href="#' + b + 'ListPage" data-role="button" data-icon="search" data-direction="reverse" class="ui-alt-icon ui-nodisc-icon"></a></li><li><a id="' + b + 'LastViewedBtn" href="#LastViewedListPage" data-role="button" data-icon="bars" class="ui-alt-icon ui-nodisc-icon"/></li><li><a id="' + b + 'AllModulesBtn" href="#AllModulesListPage" data-role="button" data-icon="grid" class="ui-alt-icon ui-nodisc-icon"/></li></ul></div></div></div>')
            }
            if (Beans[b].Predefined.indexOf("Edit") == -1) {
                $.mobile.pageContainer.append('<div data-module="' + b + '" id="Edit' + b + '" data-role="page" data-theme="b"><div data-role="header" data-theme="d" data-module="' + b + '"> <h1 id="Edit' + b + 'Title"/> <a data-role="button" href="javascript:refreshPage()" data-theme="c">' + sugar_app_strings.LBL_CANCEL_BUTTON_LABEL + '</a> <a data-link="save" id="Edit' + b + 'ConfirmTopBtn" href="#" data-role="button"  data-inline="true" class="ui-btn-right" data-theme="b">' + sugar_app_strings.LBL_SAVE_BUTTON_LABEL + '</a></div><div data-role="content" data-theme="d"> <div id="Edit' + b + 'Btn"/><div id="' + b + 'Dup" style="display:none"><input type="hidden" id="' + b + 'isDup"><p id="' + b + 'DupMsg"></p></div><div id="Edit' + b + 'Additional"/><div id="Edit' + b + 'Ftr"/><br> <div class="CenterBtns" data-module="' + b + '">  <a id="Edit' + b + 'CancelBottomBtn" href="javascript:refreshPage()" data-role="button" data-inline="true" data-theme="c">' + sugar_app_strings.LBL_CANCEL_BUTTON_LABEL + '</a>  <a data-link="save" id="Edit' + b + 'ConfirmBottomBtn" href="#" data-theme="b" data-role="button" data-inline="true" >' + sugar_app_strings.LBL_SAVE_BUTTON_LABEL + "</a> </div></div></div>");
                l = $("#Edit" + b + "Additional");
                for (var u in HiddenFields) {
                    l.append('<input id="' + b + HiddenFields[u] + '" type="hidden">')
                }
            }
        }
    }
    for (d in n) {
        b = n[d];
        if (Beans[b] !== undefined && sugar_app_list_strings.moduleList[b] !== undefined) {
            QuickCRMAddDetailsPage(b);
            QuickCRMAddListPage(b)
        }
    }
    if (n.indexOf("AOS_Products_Quotes") === -1 && (js_plugins.indexOf("AOS.js") !== -1) && (sugar_mod_fields.AOS_Products_Quotes !== undefined) && (Beans.AOS_Products_Quotes !== undefined) && (n.indexOf("AOS_Quotes") !== -1 || n.indexOf("AOS_Invoices") !== -1)) {
        QCRM.beans.push("AOS_Products_Quotes")
    }
    if (sugar_app_list_strings.moduleList.QCRM_SavedSearch && mobile_edition === "Pro") {
        QCRM.beans.unshift("QCRM_SavedSearch")
    }
    QCRM.beans.unshift("Users");
    if (sugar_mod_fields.Favorites) {
        QCRM.beans.unshift("Favorites")
    }
};
QCRM.jjwg_MarkersSetup = function()
{
    var a, b = sugar_app_list_strings.marker_image_list, c = [];
    Beans.jjwg_Markers.ListFields = ["name", "city", "description", "jjwg_maps_lat", "jjwg_maps_lng", "marker_image"];
    for (a in b) {
        c.push([a, b[a]])
    }
    c.sort(function(e, d)
    {
        return e[1] < d[1] ? -1 : 1
    });
    b = {};
    for (a in c) {
        b[c[a][0]] = c[a][1]
    }
    sugar_app_list_strings.marker_image_list = b;
    sugar_mod_fields.jjwg_Markers.jjwg_maps_lat.type = "varchar";
    sugar_mod_fields.jjwg_Markers.jjwg_maps_lat.def = "0.00000000";
    sugar_mod_fields.jjwg_Markers.jjwg_maps_lng.type = "varchar";
    sugar_mod_fields.jjwg_Markers.jjwg_maps_lng.def = "0.00000000";
    sugar_mod_fields.jjwg_Markers.marker_image.display = function(e, d)
    {
        return sugar_app_list_strings.marker_image_list[e] + '<img style="margin-left:10px;vertical-align:middle" src="' + JJWG.MarkersDir + e + '.png"/>'
    };
    QCRM.SetModuleHook("jjwg_Markers", "init_edit", function()
    {
        $("#Editjjwg_MarkersFtr").append('<a data-inline="true" data-role="button" data-mini="true" class="ui-alt-icon ui-nodisc-icon" id="MarkerGeo" href="#">Geocode</a>');
        $("#Editjjwg_MarkersFtr").append('<em id="MarkerStatus"></em>');
        $("#MarkerGeo").click(function()
        {
            QCRM.jjwg_MarkersGeoEdit($("#Editjjwg_Markers_description").val(), "Editjjwg_Markers_jjwg_maps_lat", "Editjjwg_Markers_jjwg_maps_lng", "MarkerStatus", "Editjjwg_Markers_description")
        })
    });
    QCRM.jjwg_MarkersGeoEdit = function(g, e, h, l, d)
    {
        if (QCRM.geocoder && QCRM.geocoder.geocode) {
            QCRM.geocoder.geocode({address: g}, function(n, m)
            {
                var o = sugar_app_strings.MSG_LIST_VIEW_NO_RESULTS_BASIC;
                if (m == google.maps.GeocoderStatus.OK) {
                    $("#" + e).val(n[0].geometry.location.lat());
                    $("#" + h).val(n[0].geometry.location.lng());
                    o = n[0].geometry.location_type;
                    if (o == "ROOFTOP") {
                        o = "OK"
                    } else {
                        o = "APPROXIMATE"
                    }
                    if (o == "OK" && d) {
                        $("#" + d).val(n[0].formatted_address)
                    }
                }
                if (l) {
                    $("#" + l).html(o);
                    setTimeout(function()
                    {
                        $("#" + l).empty()
                    }, 5000)
                }
            })
        }
    };
    QCRM.jjwg_MarkersGeoView = function(e, d, g, h)
    {
        if (QCRM.geocoder && QCRM.geocoder.geocode) {
            QCRM.geocoder.geocode({address: e}, function(m, l)
            {
                if (l == google.maps.GeocoderStatus.OK) {
                    h[d].value = m[0].geometry.location.lat();
                    h[g].value = m[0].geometry.location.lng()
                }
            })
        }
    };
    if (!mobile_app && !/android|iphone|ipad/i.test(navigator.userAgent)) {
        return
    }
    QCRM.jjwg_MarkersGet = function()
    {
        function d(g)
        {
        }

        function e(g)
        {
            var h = {lat: g.coords.latitude, lng: g.coords.longitude};
            if (JJWG && JJWG.position) {
                JJWG.position.lat = g.coords.latitude;
                JJWG.position.lng = g.coords.longitude
            }
            $("#Editjjwg_Markers_jjwg_maps_lat").val(g.coords.latitude);
            $("#Editjjwg_Markers_jjwg_maps_lng").val(g.coords.longitude);
            QCRM.geocoder.geocode({location: h}, function(m, l)
            {
                if (l === google.maps.GeocoderStatus.OK) {
                    if (m[1]) {
                        $("#Editjjwg_Markers_description").val(m[1].formatted_address)
                    }
                }
            })
        }

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(e, d, {enableHighAccuracy: true})
        }
    };
    QCRM.SetModuleHook("jjwg_Markers", "before_create", function(e, d, g, h)
    {
        QCRM.jjwg_MarkersGet();
        $("#MarkerGPS").hide()
    });
    QCRM.SetModuleHook("jjwg_Markers", "before_update", function(g, e)
    {
        var d = true;
        if (e && e.jjwg_maps_lat) {
            if (e.jjwg_maps_lat.value != 0 || e.jjwg_maps_lng.value != 0) {
                d = false
            }
        }
        if (d) {
            $("#MarkerGPS").show()
        } else {
            $("#MarkerGPS").hide()
        }
    });
    QCRM.SetModuleHook("jjwg_Markers", "init_edit", function()
    {
        $("#Editjjwg_MarkersFtr").prepend('<a style="display:none;" data-inline="true" data-role="button" data-mini="true" class="ui-alt-icon ui-nodisc-icon" data-icon="location" id="MarkerGPS" href="#">' + RES_SAVE_COORD + "</a>");
        $("#MarkerGPS").click(QCRM.jjwg_MarkersGet)
    })
};
QCRM.EmailsSetup = function()
{
    Beans.Emails.acl.edit = false;
    $.each(Beans.Emails.Links, function(a, b)
    {
        this.select = false;
        this.create = false
    });
    Beans.Emails.OrderBy = "date_entered desc"
};
QCRM.ProspectListsSetup = function()
{
    if (Beans.Contacts.Links.prospect_lists) {
        Beans.Contacts.Links.prospect_lists.create = false
    }
    if (Beans.Accounts.Links.prospect_lists) {
        Beans.Accounts.Links.prospect_lists.create = false
    }
    if (Beans.Leads.Links.prospect_lists) {
        Beans.Leads.Links.prospect_lists.create = false
    }
};
QCRM.CasesSetup = function()
{
    if (sugar_mod_fields.Cases.update_text) {
        sugar_mod_fields.Cases.update_text.type = "text";
        sugar_mod_fields.Cases.update_text.source = ""
    }
    if (sugar_mod_fields.Cases.internal) {
        sugar_mod_fields.Cases.internal.type = "bool";
        sugar_mod_fields.Cases.internal.source = ""
    }
    if (sugar_mod_fields.Cases.aop_case_updates_threaded) {
        sugar_mod_fields.Cases.aop_case_updates_threaded.type = "text";
        sugar_mod_fields.Cases.aop_case_updates_threaded.source = ""
    } else {
        if (sugar_mod_fields.Cases.update_text) {
            sugar_mod_fields.Cases.aop_case_updates_threaded = sugar_mod_fields.Cases.update_text
        }
    }
    Beans.Cases.EditExcluded.push("aop_case_updates_threaded");
    Beans.Cases.DetailExcluded.push("update_text", "internal")
};
QCRM.setProfile = function()
{
    if (mobile_edition === "Pro" && QCRM.Profiles && CurrentProfileId !== "" && QCRM.Profiles[CurrentProfileId]) {
        var b = QCRM.Profiles[CurrentProfileId], a = {
            fields: "AdditionalFields",
            detail: "DetailFields",
            edit: "EditFields",
            list: "CustomListFields",
            search: "SearchFields",
            subpanels: "subpanels",
            marked: "ColoredField",
            basic_search: "basic_search",
            highlighted: "highlighted"
        };
        $.each(a, function(d, c)
        {
            if (b[d]) {
                $.each(b[d], function(e, g)
                {
                    if (g) {
                        Beans[e][c] = g
                    }
                })
            }
        })
    }
};
QCRM.defProfile = function(c, a, b, d)
{
    if (QCRM.Profiles[c] === undefined) {
        QCRM.Profiles[c] = {}
    }
    QCRM.Profiles[c][a] = d ? jQuery.parseJSON(b) : b
};
function ComputeFieldsToUpdate(e)
{
    var m, n, u = Beans[e], v = {}, b = [], a = false, c = sugar_mod_fields[e];
    for (var q in u.Links) {
        var n = [], d = u.Links[q].module;
        if (Beans[d] !== undefined && Beans[d].Enabled()) {
            var r = {name: q, value: ["id"]};
            switch (Beans[d].template) {
                case"person":
                    r.value.push("first_name");
                    r.value.push("last_name");
                    break;
                case"file":
                    r.value.push("document_name");
                    break;
                default:
                    r.value.push("name");
                    break
            }
            b.push(r);
            if (Beans[e].Links[q].id_name) {
                var l = u.Links[q].id_name, g;
                for (fld in c) {
                    if (c[fld].type === "relate" && c[fld].id_name === l) {
                        g = fld;
                        v[q] = {id_name: l, id_value: g, person: (Beans[d].template === "person")};
                        a = true;
                        break
                    }
                }
            }
        } else {
            if (SimpleBeans[d] !== undefined) {
                b.push({name: q, value: ["id"]})
            }
        }
    }
    Beans[e].toUpdate = a;
    Beans[e].toUpdateFields = v;
    Beans[e].link_fields = JSON.stringify(b);
    if (!Beans[e].EditFields) {
        Beans[e].EditFields = Beans[e].TitleFields.concat(Beans[e].AdditionalFields)
    }
    Beans[e].EditFields = Array_unique(Beans[e].EditFields);
    if (!Beans[e].DetailFields) {
        Beans[e].DetailFields = Beans[e].EditFields.slice()
    }
    Beans[e].DetailFields = Array_unique(Beans[e].DetailFields);
    n = Array_unique(Beans[e].EditFields.concat(Beans[e].DetailFields));
    if (Beans[e].template == "file" && sugar_mod_fields[e].filename && QCRM.ServerVersion >= "4.9.5") {
        sugar_mod_fields[e].filename.type = "file"
    }
    for (m in n) {
        var p = n[m], h = c[p];
        if (p.substring(0, 4) === "$ADD") {
            var o = p.substring(4), s = "LBL_" + o.toUpperCase() + "_ADDRESS";
            sugar_mod_fields[e][p] = {
                type: "address",
                key: o,
                label: sugar_mod_strings[e][s] || sugar_app_strings[s] || "Address"
            };
            if (sugar_mod_fields[e][o + "_address_street"]) {
                sugar_mod_fields[e][o + "_address_street"].type = "text"
            }
        } else {
            if (h) {
                if (p == "duration_minutes") {
                    h.type = "hidden"
                } else {
                    if (p == "duration_hours") {
                        h.display = function(z, w)
                        {
                            return w.duration_hours.value + "h&nbsp;" + w.duration_minutes.value + "m&nbsp;"
                        }
                    } else {
                        if (p == "jjwg_maps_address_c") {
                            h.type = "jjwgaddress"
                        } else {
                            if (p == "description_html") {
                                h.type = "html"
                            }
                        }
                    }
                }
            }
        }
    }
}
function ComputePhoneFields(b)
{
    var a = Beans[b], d = [], c = false;
    for (var h in a.Links) {
        var g = a.Links[h].module;
        if (Beans[g] !== undefined && Beans[g].Enabled() && Beans[g].PhoneFields.length > 0) {
            var e = {name: h, value: ["id", "assigned_user_id"]};
            switch (Beans[g].template) {
                case"person":
                    e.value.push("first_name");
                    e.value.push("last_name");
                    break;
                case"file":
                    e.value.push("document_name");
                    break;
                default:
                    e.value.push("name");
                    break
            }
            e.value = e.value.concat(Beans[g].PhoneFields);
            d.push(e);
            c = true
        }
    }
    if (c) {
        Beans[b].link_phone_fields = JSON.stringify(d)
    }
}
Beans.Users = new SugarBean("Users", "users", "person");
Beans.Users.Enabled = function()
{
    return true
};
Beans.Users.CheckEdit = function(a)
{
    return false
};
Beans.Users.ShowTab = false;
Beans.Users.HomeIcon = false;
Beans.Users.access = "view";
Beans.Users.SyncOptions = {sync: "All", max: false};
Beans.Employees = new SugarBean("Employees", "users", "person");
Beans.Employees.CheckEdit = function(a)
{
    return false
};
Beans.Employees.DuplicateButton = false;
Beans.Employees.access = "view";
Beans.Employees.HomeIcon = false;
Beans.Employees.Links.reportees = new SugarLink("reportees", "Employees", "Employees", false, false, false, []);
QCRM.SetFieldHook("Employees", "reports_to_name", "module", "Employees");
Beans.Employees.LimitWhere = "(@table.show_on_employees = 1 AND @table.is_group = 0 AND @table.employee_status='Active')";
Beans.Employees.SyncDefaults = {sync: "All", max: false};
if (sugar_app_list_strings.moduleList.QCRM_SavedSearch && mobile_edition === "Pro") {
    Beans.QCRM_Homepage = new SugarBean("QCRM_Homepage", "qcrm_homepage", "basic");
    Beans.QCRM_Homepage.ListFields = ["name", "description", "dashlets", "icons", "hidden", "creates", "assigned_user_id"];
    if (db_type !== "mssql") {
        Beans.QCRM_Homepage.ListFields.push(shared_field)
    }
    Beans.QCRM_Homepage.ShowTab = false;
    Beans.QCRM_Homepage.HomeIcon = false;
    Beans.QCRM_Homepage.SyncOptions = {sync: "None", max: false};
    Beans.QCRM_Homepage.default_name = function()
    {
        var a = mobile_app ? (iOS ? "iOS" : "Android") : "Web App";
        if (typeof device !== "undefined" && device && device.model) {
            a = device.model
        }
        return a
    };
    Beans.QCRM_Homepage.SaveAll = function(c)
    {
        if (GetDemo()) {
            return
        }
        var a = getHomePageDef(), b = Record2NVL(a, this.ListFields);
        if (Pref.Today) {
            b.dashlets.value.unshift({id: "Today", type: "Preset"})
        }
        b.icons.value = (b.icons.value.length === 0) ? "" : btoa(JSON.stringify(b.icons.value));
        b.dashlets.value = (b.dashlets.value.length === 0) ? "" : btoa(JSON.stringify(b.dashlets.value));
        b.hidden.value = (b.hidden.value.length === 0) ? "" : btoa(JSON.stringify(b.hidden.value));
        b.creates.value = (b.creates.value.length === 0) ? "" : btoa(JSON.stringify(b.creates.value));
        if (c && a.id !== "") {
            b.new_with_id = {name: "new_with_id", value: "1"}
        }
        if (b.name.value === "") {
            b.name.value = Beans.QCRM_Homepage.default_name()
        }
        if (b.assigned_user_id.value === "") {
            b.assigned_user_id = {name: "assigned_user_id", value: CurrentUserId}
        }
        QCRM.set_entry("QCRM_Homepage", a.id, b, function(d)
        {
            if (d && d.id) {
                QCRM.homepage.id = d.id;
                QCRM.homepage.name = b.name.value
            }
            SaveHomePageDef()
        }, null)
    };
    Beans.QCRM_SavedSearch = new SugarBean("QCRM_SavedSearch", "qcrm_savedsearch", "basic");
    Beans.QCRM_SavedSearch.ListFields = ["name", "fields", "sort_order", "date_modified", "date_entered", "assigned_user_id", "type", "description"];
    if (db_type !== "mssql") {
        Beans.QCRM_SavedSearch.ListFields.push(shared_field)
    }
    Beans.QCRM_SavedSearch.ShowTab = false;
    Beans.QCRM_SavedSearch.HomeIcon = false;
    Beans.QCRM_SavedSearch.SyncOptions = {sync: "All", max: false};
    Beans.QCRM_SavedSearch.Init = function()
    {
        var b, a, c = [];
        for (b in QCRM.beans) {
            a = QCRM.beans[b];
            if (Beans[a].Enabled()) {
                c.push(a)
            }
        }
        if (db_type !== "mssql") {
            Beans.QCRM_SavedSearch.LimitWhere = "((@table.assigned_user_id = '" + CurrentUserId + "') OR (@table." + shared_field + "=1)) AND @table.type IN ('" + c.join("','") + "')"
        } else {
            Beans.QCRM_SavedSearch.LimitWhere = "(@table.assigned_user_id = '" + CurrentUserId + "') AND @table.type IN ('" + c.join("','") + "')"
        }
    };
    Beans.QCRM_SavedSearch.SaveAll = function(l)
    {
        var a, e = false, h = false, d = QCRM.SavedSearches, g = [];
        for (a in d) {
            var c = d[a];
            if (c && (c.assigned_user_id === CurrentUserId || c.assigned_user_id === "")) {
                if (c.assigned_user_id == "") {
                    c.assigned_user_id === CurrentUserId
                }
                var b = Record2NVL(c, Beans.QCRM_SavedSearch.ListFields.concat("id"));
                b.fields.value = btoa(JSON.stringify(b.fields.value));
                if (l) {
                    b.new_with_id = {name: "new_with_id", value: "1"}
                }
                g.push(b);
                h = true
            }
            e = true
        }
        if (h && !GetDemo()) {
            SugarQuery("set_entries", JSON.stringify({
                session: SugarSessionId,
                module_name: "QCRM_SavedSearch",
                name_value_lists: g
            }, null, 2), function(m)
            {
                Beans.QCRM_Homepage.SaveAll(l)
            }, null)
        } else {
            Beans.QCRM_Homepage.SaveAll(l)
        }
        if (QCRM.saveToCRM) {
            QCRM.saveToCRM = false;
            SaveHomePageDef()
        }
    };
    Beans.QCRM_SavedSearch.LoadAll = function(a, c)
    {
        var e = "";

        function h(l)
        {
            cleanUpIconAndDashlet();
            SaveSearchesAndHomePage(false);
            if (l) {
                updateDashlets();
                QCRM.UpdFavIcons = true;
                QCRM.UpdButtons = true;
                HomepageRefresh(false);
                $.mobile.loading("hide")
            }
        }

        if (!QCRM.OffLine) {
            $.mobile.loading("show");
            if (c) {
                var g = {};
                for (var b in QCRM.SavedSearches) {
                    var d = QCRM.SavedSearches[b];
                    if (d[shared_field] == 0) {
                        g[b] = d
                    }
                }
                QCRM.SavedSearches = g;
                if (db_type !== "mssql") {
                    e = shared_field + "=1"
                }
            } else {
                QCRM.SavedSearches = {}
            }
            QCRM.get_entry_list("QCRM_SavedSearch", e, this.ListFieldsToSelect(), '""', 0, 200, "name", function(s)
            {
                if (s && s.entry_list) {
                    var m, l = s.entry_list.length;
                    for (m = 0; m < l; m++) {
                        var p = s.entry_list[m], q = p.name_value_list, o, n = {id: p.id};
                        q.fields.value = jQuery.parseJSON(atob(q.fields.value));
                        for (o in Beans.QCRM_SavedSearch.ListFields) {
                            var r = Beans.QCRM_SavedSearch.ListFields[o];
                            n[r] = q[r].value
                        }
                        if (db_type === "mssql") {
                            n[shared_field] === "0"
                        }
                        QCRM.SavedSearches[p.id] = n
                    }
                    if (a) {
                        QCRM.get_entry_list("QCRM_Homepage", "qcrm_homepage.assigned_user_id ='" + CurrentUserId + "'", Beans.QCRM_Homepage.ListFieldsToSelect(), '""', 0, 100, "date_modified desc", function(C)
                        {
                            var E = false, u, v = false, D, z;
                            if (C) {
                                var w = C.entry_list.length, A, B = QCRM.homepage.name;
                                if (B === "") {
                                    B = Beans.QCRM_Homepage.default_name()
                                }
                                for (A = 0; A < w; A++) {
                                    var F = C.entry_list[A].name_value_list;
                                    if (F.id.value === QCRM.homepage.id || F.name.value === B) {
                                        v = true;
                                        break
                                    }
                                }
                                if (w > 0) {
                                    if (v) {
                                        QCRM.homepage = {
                                            name: F.name.value,
                                            id: F.id.value,
                                            assigned_user_id: F.assigned_user_id.value
                                        };
                                        QCRM.homepage[shared_field] = (db_type === "mssql") ? "0" : F[shared_field].value
                                    } else {
                                        F = C.entry_list[0].name_value_list
                                    }
                                    E = true;
                                    QCRM.searchIcons = (F.icons.value === "") ? [] : jQuery.parseJSON(atob(F.icons.value));
                                    QCRM.Dashlets = (F.dashlets.value === "") ? [] : jQuery.parseJSON(atob(F.dashlets.value));
                                    Pref.Hidden = (F.hidden.value === "") ? [] : jQuery.parseJSON(atob(F.hidden.value));
                                    Pref.Creates = (F.creates.value === "") ? [] : jQuery.parseJSON(atob(F.creates.value));
                                    if (QCRM.DashletMember(QCRM.Dashlets, "Today")) {
                                        Pref.Today = true;
                                        QCRM.DashletRemove(QCRM.Dashlets, "Today")
                                    } else {
                                        Pref.Today = false
                                    }
                                }
                            }
                            h(E)
                        })
                    } else {
                        h(true)
                    }
                } else {
                    $.mobile.loading("hide")
                }
            })
        }
    }
}
Beans.SugarFeed = new SugarBean("SugarFeed", "sugarfeed", "basic");
Beans.SugarFeed.OrderBy = "date_entered desc";
Beans.SugarFeed.fullPage = true;
Beans.Accounts = new SugarBean("Accounts", "accounts", "company");
Beans.Accounts.ListFields = ["name", "billing_address_city", "billing_address_state", "billing_address_city", "billing_address_postalcode"];
if (Q_API >= "3.0") {
    Beans.Accounts.ListFields.push("name", "billing_address_street", "shipping_address_street", "shipping_address_city", "shipping_address_state", "shipping_address_city", "shipping_address_postalcode")
}
Beans.Accounts.ListViewTpl = "<h4>{name}</h4><p>{billing_address_city} {billing_address_state}</p>";
Beans.Accounts.TableViewTpl = ["billing_address_city", "billing_address_state"];
Beans.Accounts.Links = {
    contacts: new SugarLink("contacts", "Accounts", "Contacts", false, true, true, false),
    opportunities: new SugarLink("opportunities", "Accounts", "Opportunities", false, true, true, false),
    calls: new SugarLink("calls", "Accounts", "Calls", false, true, false, false),
    meetings: new SugarLink("meetings", "Accounts", "Meetings", false, true, false, false),
    tasks: new SugarLink("tasks", "Accounts", "Tasks", false, true, false, false),
    leads: new SugarLink("leads", "Accounts", "Leads", false, false, false, false),
    cases: new SugarLink("cases", "Accounts", "Cases", false, true, false, false),
    notes: new SugarLink("notes", "Accounts", "Notes", false, true, false, false)
};
if (QCRM.OffLine) {
    Beans.Accounts.Links.meetings.backlink = "accounts";
    Beans.Accounts.Links.calls.backlink = "accounts"
}
Beans.Contacts = new SugarBean("Contacts", "contacts", "person");
Beans.Contacts.ListFields = ["first_name", "last_name", "account_name", "title", "email1", "account_id"];
Beans.Contacts.ListViewTpl = "<h4>{first_name} {last_name}</h4><p>{title} {account_name}</p>";
Beans.Contacts.TableViewTpl = ["title", "account_name", "email1"];
Beans.Contacts.Links = {
    calls: new SugarLink("calls", "Contacts", "Calls", false, true, false, false),
    meetings: new SugarLink("meetings", "Contacts", "Meetings", false, true, false, false),
    tasks: new SugarLink("tasks", "Contacts", "Tasks", false, true, false, false),
    opportunities: new SugarLink("opportunities", "Contacts", "Opportunities", false, true, true, false),
    cases: new SugarLink("cases", "Contacts", "Cases", false, true, false, false),
    notes: new SugarLink("notes", "Contacts", "Notes", false, true, false, false)
};
if (QCRM.OffLine) {
    Beans.Contacts.Links.meetings.backlink = "contacts";
    Beans.Contacts.Links.calls.backlink = "contacts"
}
QCRM.SetFieldHook("Contacts", "account_name", "copyfields", [{
    copy: "phone_work",
    from: "phone_office"
}, {copy: "primary", from: "billing"}]);
QCRM.SetModuleHook("Contacts", "after_retrieve", function(c, a)
{
    var b = Beans.Contacts;
    if (c.account_id !== undefined && c.account_id.value !== undefined) {
        b.CurrentParentId = c.account_id.value;
        b.CurrentParentName = c.account_name.value;
        b.CurrentParentType = "Accounts"
    } else {
        b.CurrentParentId = "";
        b.CurrentParentName = "";
        b.CurrentParentType = ""
    }
});
Beans.Leads = new SugarBean("Leads", "leads", "person");
Beans.Leads.ListFields = ["first_name", "last_name", "title", "account_name", "account_id", "contact_id", "email1"];
Beans.Leads.EditExcluded.push("converted");
Beans.Leads.ListViewTpl = "<h4>{first_name} {last_name}</h4><p>{title} {account_name}</p>";
Beans.Leads.TableViewTpl = ["title", "account_name", "email1"];
Beans.Leads.Links = {
    calls: new SugarLink("calls", "Leads", "Calls", false, true, false, false),
    meetings: new SugarLink("meetings", "Leads", "Meetings", false, true, false, false),
    tasks: new SugarLink("tasks", "Leads", "Tasks", false, true, false, false),
    notes: new SugarLink("notes", "Leads", "Notes", false, true, false, false)
};
if (QCRM.OffLine) {
    Beans.Leads.Links.meetings.backlink = "leads";
    Beans.Leads.Links.calls.backlink = "leads"
}
Beans.Leads.ViewDetailsHdrHook = function(d)
{
    if (d.status !== undefined && d.status.value === "Converted") {
        var a = [];
        var b, c;
        if (d.contact_id !== undefined && d.contact_id.value !== "") {
            a.push({module: "Contacts", id: d.contact_id.value, name: Beans.Contacts.DisplayTitle(d)})
        }
        if (d.account_id !== undefined && d.account_id.value !== "") {
            a.push({module: "Accounts", id: d.account_id.value, name: d.account_name.value})
        }
        if (d.opportunity_id !== undefined && d.opportunity_id.value !== "") {
            a.push({module: "Opportunities", id: d.opportunity_id.value, name: d.opportunity_name.value})
        }
        if (a.length > 0) {
            GetBeansList(a, "LeadsDetailsList", false, sugar_app_list_strings.lead_status_dom.Converted)
        }
    }
};
if (sugar_mod_strings.Leads && sugar_mod_strings.Leads.LBL_CONVERTLEAD && sugar_mod_strings.Contacts && sugar_mod_strings.Accounts) {
    $("#ConvertLead").on("pagebeforecreate", function()
    {
        var c, d, b, a = "#ConvertLead";
        $(a + "Title").text(sugar_mod_strings.Leads.LBL_CONVERTLEAD);
        $(a + "CancelTopBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
        $(a + "ConfirmTopBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL);
        $(a + "CancelBottomBtn").text(sugar_app_strings.LBL_CANCEL_BUTTON_LABEL);
        $(a + "ConfirmBottomBtn").text(sugar_app_strings.LBL_SAVE_BUTTON_LABEL);
        $('label[for="ConvOptCreateContact"]').html(QCRM.getModuleString("Leads", "LNK_NEW_CONTACT", "Create Contact"));
        $('label[for="ConvOptCreateAccount"]').html(QCRM.getModuleString("Leads", "LNK_NEW_ACCOUNT", "Create Account"));
        $('label[for="CLLeads_contact_name"]').html(QCRM.getModuleString("Leads", "LNK_SELECT_CONTACTS", "Or Select Contact"));
        $('label[for="CLLeads_account_name"]').html(QCRM.getModuleString("Leads", "LNK_SELECT_ACCOUNTS", "Or Select Account"));
        b = Beans.Contacts;
        init_add_form("Contacts", b.EditFields || b.TitleFields.concat(b.AdditionalFields), b.EditExcluded.concat(["account_name"]), $("#ConvertContactCreate"), "CLC_");
        b = Beans.Accounts;
        init_add_form("Accounts", b.EditFields || b.TitleFields.concat(b.AdditionalFields), b.EditExcluded, $("#ConvertAccountCreate"), "CLA_");
        $("#CLLeads_account_name").on("input", function(g)
        {
            pickRelate("Leads", "account_id", "account_name", "Accounts", "", [], "CLLeads_")
        });
        $("#CLLeads_contact_name").on("input", function(g)
        {
            pickRelate("Leads", "contact_id", "contact_name", "Contacts", "", [], "CLLeads_")
        })
    });
    $("#ConvertLead").on("pageshow", function()
    {
        $("#ConvOptCreateContact").prop("checked", true).checkboxradio("refresh");
        $("#ConvOptCreateAccount").prop("checked", true).checkboxradio("refresh");
        Beans.Leads.ToggleContact();
        Beans.Leads.ToggleAccount();
        $("#CLLeads_account_name").val("");
        $("#CLLeads_contact_name").val("");
        $("#CLLeads_account_id").val("");
        $("#CLLeads_contact_id").val("");
        $("#CLLeadscontact_nameL").empty();
        $("#CLLeadsaccount_nameL").empty()
    });
    Beans.Leads.ToggleContact = function()
    {
        if ($("#ConvOptCreateContact").is(":checked")) {
            $("#ConvertContactCreate").show();
            $("#ConvertContactSearch").hide()
        } else {
            $("#ConvertContactCreate").hide();
            $("#ConvertContactSearch").show()
        }
    };
    Beans.Leads.ToggleAccount = function()
    {
        if ($("#ConvOptCreateAccount").is(":checked")) {
            $("#ConvertAccountCreate").show();
            $("#ConvertAccountSearch").hide()
        } else {
            $("#ConvertAccountCreate").hide();
            $("#ConvertAccountSearch").show()
        }
    };
    Beans.Leads.ConvertDef = {
        Accounts: {
            assigned_user_name: "assigned_user_name",
            assigned_user_id: "assigned_user_id",
            account_name: "name",
            account_description: "description",
            phone_work: "phone_office",
            primary_address_street: "billing_address_street",
            primary_address_city: "billing_address_city",
            primary_address_postalcode: "billing_address_postalcode",
            primary_address_state: "billing_address_state",
            primary_address_country: "billing_address_country"
        },
        Contacts: {
            assigned_user_name: "assigned_user_name",
            assigned_user_id: "assigned_user_id",
            description: "description"
        }
    };
    Beans.Leads.CopyValues = function(b)
    {
        var a = CurrentRecordValues, l = {}, d, e, c, n = a.assigned_user_id.value, m = Beans[b].AllFields(), g = Beans.Leads.AllFields();
        for (d in Beans.Leads.ConvertDef[b]) {
            var h = Beans.Leads.ConvertDef[b][d];
            if (g.indexOf(d) !== -1 || d === "assigned_user_id") {
                l[h] = {name: h, value: a[d].value}
            }
        }
        for (e in m) {
            d = m[e];
            if (l[d] === undefined) {
                l[d] = {name: d, value: (g.indexOf(d) !== -1 && a[d] !== undefined) ? a[d].value : ""}
            }
        }
        return l
    };
    Beans.Leads.ConvertManual = function()
    {
        var e = Beans.Leads, c = e.CopyValues("Contacts"), g = e.CopyValues("Accounts"), d, b, a;
        $("body").pagecontainer("change", "#ConvertLead");
        a = Beans.Contacts.AllEditFields();
        for (d in a) {
            b = a[d];
            init_form_field("Contacts", b, "", false, c, "#CLC_", "")
        }
        a = Beans.Accounts.AllEditFields();
        for (d in a) {
            b = a[d];
            init_form_field("Accounts", b, "", false, g, "#CLA_", "")
        }
    };
    Beans.Leads.SaveConverted = function()
    {
        function g(p, r, q)
        {
            QCRM.set_entry("Leads", Beans.Leads.CurrentId, {
                assigned_user_id: {name: "assigned_user_id", value: p},
                converted: {name: "converted", value: "1"},
                status: {name: "status", value: "Converted"},
                account_id: {name: "account_id", value: q},
                contact_id: {name: "contact_id", value: r}
            }, function(s)
            {
                $.mobile.loading("hide");
                if (q !== "") {
                    QCRM.set_relationship("Accounts", q, "contacts", r)
                }
                $("body").pagecontainer("change", "#Leads" + (Beans.Leads.fullPage ? "DP" : "ListPage"), {reverse: true});
                Beans.Leads.ViewDetails()
            })
        }

        function b(q, s, r, p)
        {
            r.account_id = {name: "account_id", value: q};
            r.account_name = {name: "account_name", value: s};
            QCRM.set_entry("Contacts", "", r, function(v)
            {
                var u;
                if ((v.name !== undefined) && (v.name === "Access Denied")) {
                    $.mobile.loading("hide");
                    AlertPopup(RES_ACCESS_DENIED_MSG);
                    return
                }
                u = v.id;
                g(p, u, q)
            })
        }

        var d = $("#ConvOptCreateAccount").is(":checked"), c = $("#ConvOptCreateContact").is(":checked"), o = $("#CLLeads_account_id").val(), a = $("#CLLeads_contact_id").val(), n = $("#CLLeads_account_name").val(), h = $("#CLLeads_contact_name").val(), e = Beans.Accounts.EditValues("#CLA_"), l = Beans.Contacts.EditValues("#CLC_"), m = CurrentRecordValues.assigned_user_id.value;
        $.mobile.loading("show");
        if (d) {
            QCRM.set_entry("Accounts", "", e, function(p)
            {
                var q;
                if ((p.name !== undefined) && (p.name === "Access Denied")) {
                    $.mobile.loading("hide");
                    AlertPopup(RES_ACCESS_DENIED_MSG);
                    return
                }
                q = p.id;
                if (c) {
                    b(q, e.name.value, l, m)
                } else {
                    g(m, a, q)
                }
            })
        } else {
            if (c) {
                b(o, n, l, m)
            } else {
                g(m, a, o)
            }
        }
    };
    Beans.Leads.ConvertAuto = function()
    {
        var c = CurrentRecordValues, b = this.CopyValues("Contacts"), e = this.CopyValues("Accounts"), a = c.assigned_user_id.value;

        function d(l, h, g)
        {
            if (l !== "") {
                h.account_id = {name: "account_id", value: l}
            }
            QCRM.set_entry("Contacts", "", h, function(n)
            {
                var m;
                if ((n.name !== undefined) && (n.name === "Access Denied")) {
                    AlertPopup(RES_ACCESS_DENIED_MSG);
                    return
                }
                m = n.id;
                QCRM.set_entry("Leads", Beans.Leads.CurrentId, {
                    assigned_user_id: {name: "assigned_user_id", value: g},
                    converted: {name: "converted", value: "1"},
                    status: {name: "status", value: "Converted"},
                    account_id: {name: "account_id", value: l},
                    contact_id: {name: "contact_id", value: m}
                }, function(o)
                {
                    Beans.Leads.ViewDetails();
                    if (l !== "") {
                        QCRM.set_relationship("Accounts", l, "contacts", m)
                    }
                })
            })
        }

        if (!Beans.Accounts.Enabled() || !c.account_name || c.account_name.value === "") {
            d("", b, a)
        } else {
            QCRM.get_entry_list("Accounts", "accounts.name LIKE '" + c.account_name.value + "'", '["id"]', "", 0, 1, "", function(g)
            {
                var h = false;
                if (g !== undefined && g.entry_list !== undefined) {
                    if (g.entry_list[0] !== undefined) {
                        h = g.entry_list[0].id
                    }
                }
                if (h === false) {
                    QCRM.set_entry("Accounts", "", e, function(l)
                    {
                        if ((l.name !== undefined) && (l.name === "Access Denied")) {
                            AlertPopup(RES_ACCESS_DENIED_MSG);
                            return
                        }
                        d(l.id, b, a)
                    })
                } else {
                    d(h, b, a)
                }
            })
        }
    };
    Beans.Leads.DisableConvert = (mobile_edition !== "Pro");
    if (!Beans.Leads.DisableConvert && !QCRM.OffLine) {
        QCRM.SetModuleHook("Leads", "actions", {
            id: "LeadsConvert",
            icon: "",
            label: sugar_mod_strings.Leads.LBL_CONVERTLEAD,
            action: Beans.Leads.ConvertManual,
            show: function(c)
            {
                var b = $("#LeadsConvert"), a = c.status.value;
                if (!Beans.Leads.DisableConvert && Beans.Contacts.Enabled() && (a !== "Converted" && a !== "Dead")) {
                    b.show()
                } else {
                    b.hide()
                }
            }
        })
    }
}
Beans.Opportunities = new SugarBean("Opportunities", "opportunities", "basic");
Beans.Opportunities.ListFields = ["name", "amount", "account_name", "currency_name", "currency_symbol", "sales_stage"];
Beans.Opportunities.OrderBy = "date_closed desc";
Beans.Opportunities.SyncOrderBy = "date_closed desc";
Beans.Opportunities.ListViewTpl = "<h4>{name}</h4><p>{account_name} {amount} {sales_stage}</p>";
Beans.Opportunities.TableViewTpl = ["account_name", "amount", "sales_stage"];
Beans.Opportunities.Links = {
    contacts: new SugarLink("contacts", "Opportunities", "Contacts", false, false, true, false),
    calls: new SugarLink("calls", "Opportunities", "Calls", false, true, false, false),
    meetings: new SugarLink("meetings", "Opportunities", "Meetings", false, true, false, false),
    tasks: new SugarLink("tasks", "Opportunities", "Tasks", false, true, false, false),
    leads: new SugarLink("leads", "Opportunities", "Leads", false, false, false, false),
    notes: new SugarLink("notes", "Opportunities", "Notes", false, true, false, false)
};
if (Q_API >= "3.0") {
    Beans.Opportunities.Links.contacts.filter = {field: "account_name", value_field: "account_name"}
}
Beans.Opportunities.AfterSave = function(c, a, b)
{
    if (a) {
        if (QCRM.OffLine && AttachTo === "Contacts" && Beans.Contacts.CurrentId !== "") {
        } else {
            if (QCRM.OffLine && AttachTo === "Accounts" && Beans.Accounts.CurrentId !== "") {
            }
        }
    }
};
Beans.Calls = new SugarBean("Calls", "calls", "basic");
Beans.Calls.ListFields = ["name", "status", "date_start"];
if (sugar_mod_fields.Calls && sugar_mod_fields.Calls.date_end) {
    Beans.Calls.ListFields.push("date_end")
}
Beans.Calls.OrderBy = "date_start desc";
Beans.Calls.SyncOrderBy = "date_start desc";
Beans.Calls.ListViewTpl = "<h4>{name}</h4><p>{status} - {date_start}</p>";
Beans.Calls.TableViewTpl = ["status", "date_start"];
Beans.Calls.Links = {
    contacts: new SugarLink("contacts", "Calls", "Contacts", false, false, true, false),
    users: new SugarLink("users", "Calls", "Users", false, false, false, []),
    leads: new SugarLink("leads", "Calls", "Leads", false, false, false, false),
    notes: new SugarLink("notes", "Calls", "Notes", false, true, false, false)
};
if (mobile_edition === "Pro") {
    Beans.Calls.Links.accounts = new SugarLink("accounts", "Calls", "Accounts", false, false, false, false);
    Beans.Calls.Links.accounts.force = true;
    function CloseActivity(a, b)
    {
        QCRM.set_entry(a, Beans[a].CurrentId, {status: {name: "status", value: "Held"}}, function(c)
        {
            b()
        })
    }

    Beans.Calls.DisplaySubpanelFilter = function(b)
    {
        return Pref.ActivitiesWhere
    };
    QCRM.SetFieldHook("Calls", "status", "Details", function(l)
    {
        var h = sugar_mod_fields.Calls.status, d = l.status.value, g = sugar_app_list_strings[h.options][d], a = (g === undefined ? d : g), c = sugar_app_strings.LBL_CLOSE_BUTTON_TITLE.replace(/\[.+/, ""), b = sugar_app_strings.LBL_CLOSE_AND_CREATE_BUTTON_TITLE.replace(/\[.+/, "");
        if (d === "Planned") {
            a += '&nbsp;&nbsp;<a id="CallsHeld" href="#" ' + button_defaults + ">" + c + '</a>&nbsp;&nbsp;<a id="CallsNew" href="#" ' + button_defaults + ">" + b + "</a>"
        }
        return a
    });
    Beans.Calls.ViewDetailsFtrHook = function(c)
    {
        if (sugar_mod_fields.Calls.status && c.status.value === "Planned") {
            var b = $("#CallsHeld"), a = $("#CallsNew");
            b.button();
            a.button();
            b.unbind("click");
            a.unbind("click");
            b.click(function(d)
            {
                CloseActivity("Calls", function()
                {
                    Beans.Calls.ViewDetails()
                })
            });
            a.click(function(d)
            {
                CloseActivity("Calls", function()
                {
                    if (sugar_mod_fields.Calls.status && sugar_mod_fields.Calls.status.def) {
                        CurrentRecordValues.status.value = sugar_mod_fields.Calls.status.def
                    }
                    CurrentRecordValues.date_start.value = toDBDateTime(new Date());
                    Beans.Calls.Duplicate()
                })
            })
        }
    }
}
Beans.Calls.AfterSave = function(d, b, c)
{
    var a = CurrentUserId;
    if (sugar_version >= "6.1") {
        if (c.assigned_user_id && c.assigned_user_id.value) {
            a = c.assigned_user_id.value
        }
    }
    if (b || a != CurrentUserId) {
        QCRM.set_relationship(this.name, d, "users", a)
    }
};
Beans.Calls.CustomValues = function(c, a)
{
    var b = {};
    if (QCRM.OffLine && (sugar_mod_fields.Calls && sugar_mod_fields.Calls.date_end && sugar_mod_fields.Meetings && sugar_mod_fields.Meetings.date_end)) {
    }
    return b
};
Beans.Calls.LoggedCall = function(b, a)
{
    return Record2NVL({
        assigned_user_id: CurrentUserId,
        name: sugar_app_list_strings.moduleListSingular.Calls + " " + a,
        direction: "Outbound",
        status: "Held",
        date_start: toDBDateTime(new Date()),
        duration_hours: "0",
        duration_minutes: "15"
    })
};
if (mobile_app || mobile_edition === "Pro") {
    Beans.Calls.CustomListStyle = function(b, a)
    {
        if (b.status.value === "Planned") {
            if (b.date_start.value < toDBDateTime(new Date())) {
                return (a ? "background-color:#" : "background:#") + HighlightedColor + ";"
            }
        }
        return ""
    }
}
Beans.Meetings = new SugarBean("Meetings", "meetings", "basic");
Beans.Meetings.ListFields = ["name", "status", "date_start"];
if (sugar_mod_fields.Meetings && sugar_mod_fields.Meetings.date_end) {
    Beans.Meetings.ListFields.push("date_end"), Beans.Meetings.EditExcluded.push("contact_name")
}
Beans.Meetings.OrderBy = "date_start desc";
Beans.Meetings.SyncOrderBy = "date_start desc";
Beans.Meetings.ListViewTpl = "<h4>{name}</h4><p>{status} - {date_start}</p>";
Beans.Meetings.TableViewTpl = ["status", "date_start"];
Beans.Meetings.Links = {
    contacts: new SugarLink("contacts", "Meetings", "Contacts", false, false, true, false),
    users: new SugarLink("users", "Meetings", "Users", false, false, true, []),
    leads: new SugarLink("leads", "Meetings", "Leads", false, false, false, false),
    notes: new SugarLink("notes", "Meetings", "Notes", false, true, false, false)
};
Beans.Meetings.Links.users.swipeType = "remove";
Beans.Meetings.Links.accounts = new SugarLink("accounts", "Meetings", "Accounts", false, false, false, false);
Beans.Meetings.Links.accounts.force = true;
Beans.Meetings.DisplaySubpanelFilter = function(b)
{
    return Pref.ActivitiesWhere
};
Beans.Meetings.EditHook = function(a, b)
{
    if (a) {
        $("#EditMeetings_duration_hours").val("1").selectmenu("refresh");
        $("#EditMeetings_duration_minutes").val("0").selectmenu("refresh")
    }
};
if (mobile_edition === "Pro") {
    QCRM.SetFieldHook("Meetings", "status", "Details", function(g)
    {
        var d = sugar_mod_fields.Meetings.status, b = g.status.value, c = sugar_app_list_strings[d.options][b], a = (c === undefined ? b : c);
        if (b === "Planned") {
            a += '&nbsp;&nbsp;<a id="MeetingsHeld" href="#" ' + button_defaults + ">" + sugar_app_strings.LBL_CLOSE_BUTTON_TITLE + "</a>"
        }
        return a
    });
    Beans.Meetings.ViewDetailsFtrHook = function(b)
    {
        if (sugar_mod_fields.Meetings.status && b.status.value === "Planned") {
            var a = $("#MeetingsHeld");
            a.button();
            a.unbind("click");
            a.click(function(c)
            {
                CloseActivity("Meetings", function()
                {
                    Beans.Meetings.ViewDetails()
                })
            })
        }
    }
}
Beans.Meetings.AfterSave = function(e, c, d)
{
    var b = CurrentUserId, a = false;
    if (sugar_version >= "6.1") {
        if (d.assigned_user_id && d.assigned_user_id.value) {
            b = d.assigned_user_id.value
        }
        if (c) {
            a = true
        } else {
            a = (CurrentRecordValues.assigned_user_id.value != b)
        }
        if (a) {
            QCRM.set_relationship(this.name, e, "users", b);
            if (QCRM.OffLine) {
            }
        }
    }
};
Beans.Meetings.CustomValues = function(c, a)
{
    var b = Beans.Calls.CustomValues(c, a);
    return b
};
if (mobile_app || mobile_edition === "Pro") {
    Beans.Meetings.CustomListStyle = function(b, a)
    {
        if (b.status.value === "Planned") {
            if (b.date_start.value < toDBDateTime(new Date())) {
                return (a ? "background-color:#" : "background:#") + HighlightedColor + ";"
            }
        }
        return ""
    }
}
Beans.Tasks = new SugarBean("Tasks", "tasks", "basic");
Beans.Tasks.available_CE = false;
Beans.Tasks.ListFields = ["name", "status", "date_due"];
Beans.Tasks.OrderBy = "date_due desc";
Beans.Tasks.ListViewTpl = "<h4>{name}</h4><p>{status} - {date_due}</p>";
Beans.Tasks.TableViewTpl = ["status", "date_due"];
Beans.Tasks.Links = {
    contacts: new SugarLink("contacts", "Tasks", "Contacts", false, false, false, false),
    notes: new SugarLink("notes", "Tasks", "Notes", false, true, false, false)
};
if (mobile_edition === "Pro") {
    Beans.Tasks.Links.accounts = new SugarLink("accounts", "Tasks", "Accounts", false, false, false, false);
    QCRM.SetFieldHook("Tasks", "status", "Details", function(g)
    {
        var d = sugar_mod_fields.Tasks.status, b = g.status.value, c = sugar_app_list_strings[d.options][b], a = (c === undefined ? b : c);
        if (b !== "Completed") {
            a += '&nbsp;&nbsp;<a id="TasksHeld" href="#" ' + button_defaults + ">" + sugar_app_strings.LBL_CLOSE_BUTTON_TITLE + "</a>"
        }
        return a
    });
    Beans.Tasks.ViewDetailsFtrHook = function(b)
    {
        if (sugar_mod_fields.Tasks.status && b.status.value !== "Completed") {
            var a = $("#TasksHeld");
            a.button();
            a.unbind("click");
            a.click(function(c)
            {
                QCRM.set_entry("Tasks", Beans.Tasks.CurrentId, {
                    status: {
                        name: "status",
                        value: "Completed"
                    }
                }, function(d)
                {
                    Beans.Tasks.ViewDetails()
                })
            })
        }
    }
}
Beans.Cases = new SugarBean("Cases", "cases", "basic");
Beans.Cases.available_CE = false;
Beans.Cases.ListFields = ["name", "status", "priority"];
Beans.Cases.ListViewTpl = "<h4>{name}</h4><p>{status} - {priority}</p>";
Beans.Cases.TableViewTpl = ["status", "priority"];
Beans.Cases.Links = {
    contacts: new SugarLink("contacts", "Cases", "Contacts", false, false, false, false),
    notes: new SugarLink("notes", "Cases", "Notes", false, true, false, false)
};
Beans.Cases.EditExcluded = ["case_number", "created_by_name", "modified_by_name"];
if (mobile_edition === "Pro") {
    Beans.Cases.Links.accounts = new SugarLink("accounts", "Cases", "Accounts", false, false, false, false)
}
Beans.Project = new SugarBean("Project", "project", "basic");
Beans.Project.available_CE = false;
Beans.Project.ListFields = ["name", "status", "priority"];
Beans.Project.ListViewTpl = "<h4>{name}</h4><p>{status} - {priority}</p>";
Beans.Project.TableViewTpl = ["status", "priority"];
Beans.Project.Links = {
    projecttask: new SugarLink("projecttask", "Project", "ProjectTask", false, true, false, false),
    notes: new SugarLink("notes", "Project", "Notes", false, true, false, false)
};
Beans.ProjectTask = new SugarBean("ProjectTask", "project_task", "basic");
Beans.ProjectTask.available_CE = false;
Beans.ProjectTask.HomeIcon = false;
Beans.ProjectTask.ListFields = ["name", "status", "assigned_user_name"];
Beans.ProjectTask.ListViewTpl = "<h4>{name}</h4><p>{status} - {assigned_user_name}</p>";
Beans.ProjectTask.TableViewTpl = ["status", "assigned_user_name"];
Beans.ProjectTask.Links = {notes: new SugarLink("notes", "ProjectTask", "Notes", false, true, false, false)};
Beans.Documents = new SugarBean("Documents", "documents", "file");
Beans.Documents.Favorites = true;
Beans.Documents.SyncDefaults = {sync: "None", max: true};
Beans.Documents.ListFields = ["document_name", "name", "document_revision_id", "filename", "last_rev_mime_type"];
QCRM.DocumentsSetup = function()
{
    QCRM.SetSearchNameFields("Documents", ["document_name", "filename"])
};
Beans.Documents.CheckEdit = function(a)
{
    return false
};
Beans.Documents.ViewDetailsFtrHook = function(b, a)
{
    displayFields(b, "Documents", ["filename"], a)
};
if (sugar_version < "6.3") {
    Beans.Documents.get_file_info = function(a)
    {
        try {
            var d, b = /(?:\.([^.]+))?$/, e = b.exec(a)[1];
            e = e.toLowerCase();
            if (e === "pdf") {
                d = "application/pdf"
            } else {
                if (a.match(QCRM.InAppExtensions)) {
                    if (a.match(QCRM.AudioExtensions)) {
                        d = "audio/" + e
                    } else {
                        d = "image/" + e
                    }
                }
            }
            if (d) {
                return {
                    filename: {name: "filename", value: a},
                    last_rev_mime_type: {name: "last_rev_mime_type", value: d}
                }
            }
        } catch (c) {
        }
        return {}
    };
    Beans.Documents.get_entry = function(c, b)
    {
        var a = this;
        SugarQuery("get_entry", '{"session":"' + SugarSessionId + '","module_name":"' + this.name + '","id":"' + c + '","select_fields":"","link_name_to_fields_array":""}', function(d)
        {
            try {
                $.extend(d.entry_list[0].name_value_list, a.get_file_info(d.entry_list[0].name_value_list.document_name.value.replace(" ", "_")))
            } catch (e) {
            }
            b(d)
        })
    };
    Beans.Documents.get_entry_list = function(d, a, c, h, b, e, l)
    {
        var g = this;
        QCRM.get_entry_list(this.name, d, a, c, h, b, e, function(n)
        {
            if (n && n.entry_list) {
                for (var m = 0; m < n.entry_list.length; m++) {
                    try {
                        $.extend(n.entry_list[m].name_value_list, g.get_file_info(n.entry_list[m].name_value_list.document_name.value.replace(" ", "_")))
                    } catch (o) {
                    }
                }
            }
            l(n)
        })
    }
}
Beans.Notes = new SugarBean("Notes", "notes", "basic");
Beans.Notes.Predefined = ["Edit"];
Beans.Notes.HomeIcon = false;
Beans.Notes.LastViewed = false;
Beans.Notes.SyncDefaults = {sync: "Rel", max: true};
Beans.Notes.DefaultRelate = {field: "contact_name", id_name: "contact_id", module: "Contacts"};
Beans.Notes.DefaultParent = {field: "parent_name", id_name: "parent_id", module: "parent_type"};
Beans.Notes.ListFields = ["name", "filename", "file_mime_type"];
QCRM.NotesSetup = function()
{
    QCRM.SetSearchNameFields("Notes", ["name", "filename"])
};
Beans.Notes.TmpFile = EmptyFile;
Beans.Notes.CustomValues = function(c, a)
{
    var b = {};
    if (c.filename === undefined || c.filename.value === "---") {
        b.filename = {name: "filename", value: ""}
    }
    return b
};
Beans.Notes.InitEditForm = function()
{
    if (this.access === "edit") {
        SugarBean.prototype.InitEditForm.call(this);
        document.getElementById("EditNotesAttach").addEventListener("change", function(a)
        {
            handleFileSelect("EditNotes", a)
        }, false);
        $('label[for="EditNotesAttach"]').html(sugar_app_strings.LBL_EDIT_BUTTON);
        $("#DelAttachBtn").html(RES_DEL_ATTACH);
        $('label[for="EditNotes_filename"]').html(display_label("Notes", "filename"));
        $("#EditNotes_filename").attr("readonly", true)
    }
};
Beans.Notes.EditHook = function(a, b)
{
    var c = CurrentRecordValues.filename;
    if (OptUpload) {
        $("#EditNotesAttach").val("");
        $("#EditNotesPict").empty();
        Beans.Notes.TmpFile = EmptyFile;
        $("#EditNotesFile").show();
        $("#DelAttachBtn").show()
    } else {
        $("#EditNotesFile").hide();
        $("#DelAttachBtn").hide()
    }
    $("#DelAttach").val(0);
    if (!a && c && c.value !== "") {
        $("#EditNotes_filename").val(c.value)
    } else {
        $("#EditNotes_filename").val(" --- ");
        $("#DelAttachBtn").hide()
    }
};
function DelAttach()
{
    $("#DelAttach").val(1);
    $("#EditNotes_filename").val(" --- ");
    Beans.Notes.TmpFile = EmptyFile;
    document.getElementById("EditNotesPict").innerHTML = "";
    $("#EditNotesAttach").val("")
}
function CamAttach(a)
{
    function c()
    {
    }

    function b(e)
    {
        var d = "picture.jpeg";
        $("#DelAttach").val(0);
        Beans.Notes.TmpFile = {name: escape(d), contents: e, mime_type: "image/jpeg"};
        $("#" + a + "_filename").val(d);
        document.getElementById(a + "Pict").innerHTML = ['<img class="thumb" src="', "data:image/jpeg;base64," + e, '" title="', escape(d), '"/>'].join("")
    }

    navigator.camera.getPicture(b, c, {
        quality: QCRM.imageResolution,
        destinationType: Camera.DestinationType.DATA_URL,
        correctOrientation: true
    })
}
function handleFileSelect(g, b)
{
    var d = b.target.files;
    Beans.Notes.TmpFile = EmptyFile;
    document.getElementById(g + "Pict").innerHTML = "";
    if (!d.length) {
        return
    }
    var e = d[0];
    if (e.type.match("image.*")) {
        var a = new FileReader();
        a.onload = (function(h)
        {
            return function(l)
            {
                document.getElementById(g + "Pict").innerHTML = ['<img class="thumb" src="', l.target.result, '" title="', escape(h.name), '"/>'].join("")
            }
        })(e);
        a.readAsDataURL(e)
    }
    var c = new FileReader();
    c.onload = (function(h)
    {
        return function(n)
        {
            $("#DelAttach").val(0);
            var m = n.target.result;
            try {
                m = window.btoa(m)
            } catch (l) {
                window.btoa(unescape(encodeURIComponent(m)))
            }
            Beans.Notes.TmpFile = {name: escape(h.name), contents: m, mime_type: e.type};
            $("#" + g + "_filename").val(h.name)
        }
    })(e);
    c.readAsBinaryString(e)
}
SimpleBeans.Users = new SugarSimpleBean("Users", "users", "users.status='Active'", "");
SimpleBeans.Users.Init = function()
{
};
if (!QCRM.OffLine) {
    SimpleBeans.Users.Fields = ["first_name", "last_name"];
    SimpleBeans.Users.OrderBy = "last_name";
    SimpleBeans.Users.ListFields = ["first_name", "last_name"];
    SimpleBeans.Users.ListViewTpl = "{first_name} {last_name}";
    SimpleBeans.Users.link_fields = '[{"name":"reportees","value":["id"]}';
    SimpleBeans.Users.link_fields += "]";
    SimpleBeans.Users.AfterLoad = function(o)
    {
        var d, c, p = false, m = false, n = false, q, b = o.entry_list, h = b.length, e = [], g = [CurrentUserId];
        for (d = 0; d < h; d++) {
            if (b[d].id === CurrentUserId && o.relationship_list[d].link_list) {
                for (c = 0; c < 2; c++) {
                    q = o.relationship_list[d].link_list[c];
                    if (q && q.records && q.records[0]) {
                        if (q.name === "reportees") {
                            n = q
                        }
                    }
                }
                if (n) {
                    for (c = 0; c < n.records.length; c++) {
                        g.push(n.records[c].link_value.id.value)
                    }
                }
                break
            }
        }
        if (!(QCRM.sugaroutfitters || QCRM.usersTable)) {
            if (e.length > 0) {
                CurrentUserRoles = e;
                e = JSON.stringify(e)
            } else {
                e = ""
            }
            localStorage.setItem(ServerAddress + "R" + CurrentUserId, e)
        }
        CurrentUserReports = g;
        if (SimpleBeans.Users.List[CurrentUserId]) {
            CurrentUserName = SimpleBeans.Users.List[CurrentUserId]
        }
        localStorage.setItem("SugarName", CurrentUserName);
        if (typeof QuickCRMAfterLogin == "function") {
            QuickCRMAfterLogin()
        }
        SyncUsersUpdate()
    }
}
var JJWG = {
    position: {lat: 0, lng: 0},
    unit: "km",
    defCountry: "",
    gps_enabled: false,
    googlemaps: false,
    modules: ["Accounts", "Contacts", "Leads"],
    fields: ["jjwg_maps_geocode_status_c", "jjwg_maps_lat_c", "jjwg_maps_lng_c", "jjwg_maps_address_c"],
    MarkersDir: "images/jjwg_Markers/"
};
JJWG.encodeFields = function(b, d, c)
{
    var a = {};
    if (c.jjwg_maps_geocode_status_c && (c.jjwg_maps_geocode_status_c.value == "OK" || c.jjwg_maps_geocode_status_c.value == "APPROXIMATE")) {
        $.each(JJWG.fields, function(e, g)
        {
            a[g] = c[g].value
        });
        $("#" + d).val(encodeObject(a))
    } else {
        $("#" + d).val("")
    }
};
JJWG.decodeFields = function(c, e, d)
{
    var b = $("#" + e).val(), a = {};
    if (b != "") {
        a = decodeObject(b);
        $.each(JJWG.fields, function(g, h)
        {
            d[h] = {name: h, value: a[h]}
        })
    }
};
if (!mobile_app) {
    if (QCRM.SuiteCRM && QCRM.SuiteCRM > "7.5") {
        JJWG.MarkersDir = "../themes/default/" + JJWG.MarkersDir
    } else {
        JJWG.MarkersDir = "../custom/themes/default/" + JJWG.MarkersDir
    }
}
JJWG.create_select = function(b, c, e, m)
{
    var g, a = JJWG.modules, h = "", d = c ? {here: RES_HERE, address: RES_ADDRESS_LABEL} : {};
    if (m === undefined) {
        m = JJWG.gps_enabled ? "here" : "address"
    }
    if (e) {
        for (g in a) {
            var l = a[g];
            if (Beans[l].Enabled()) {
                if (h === "") {
                    h = l
                }
                if (m === "") {
                    m = l
                }
                d[l] = sugar_app_list_strings.moduleList[l]
            }
        }
    }
    return create_select(b, d, m, true)
};
JJWG.updateFilters = function()
{
    var c = 0, b = $("#map_search_type").val(), e = getSavedSearchList(b), a = false, d = "";
    if (e == false) {
        e = {"0": " --- "}
    }
    e.myitems = RES_MY_ITEMS;
    $.each(e, function(h, g)
    {
        if (h !== "") {
            c++;
            d += "<option " + (a === h ? 'selected="selected" ' : "") + 'value="' + h + '">' + g + "</option>"
        }
    });
    if (b === "Meetings" && c == 2 && JJWG.modules.indexOf(b) !== -1) {
        d += '<option value="today">' + sugar_app_list_strings.date_search.today + "</option>";
        d += '<option value="next_7_days">' + sugar_app_list_strings.date_search.next_7_days + "</option>"
    }
    $("#map_filter_search").html(d);
    $("#map_filter_search").selectmenu("refresh")
};
$("#JJWG").on("pagebeforecreate", function()
{
    $("#map_type_title").text(RES_SEARCH_LABEL);
    $("#map_filter_title").text(RES_FILTER);
    $("#JJWGTitle").text(RES_MAPS_TITLE);
    $("#mapSearchBtn").text(sugar_app_strings.LBL_SEARCH_BUTTON_LABEL);
    var b = $('<div data-role="controlgroup" data-type="horizontal"/>');
    b.append(JJWG.create_select("map_search_type", false, true));
    if (mobile_app || mobile_edition === "Pro") {
        b.append(create_select("map_filter_search", getSavedSearchList("Accounts"), false, true, false))
    }
    if (!Beans.jjwg_Markers || !Beans.jjwg_Markers.Enabled()) {
        $("#map_markers_div").hide()
    } else {
        $('label[for="map_markers_opt"]').html(sugar_app_list_strings.moduleList.jjwg_Markers)
    }
    $("#map_type").html(b);
    $("#map_dist_title").text(RES_DIST + " (" + JJWG.unit + ")");
    $("#map_dist").append("<input id='map_search_dist' data-mini='true' type='number' value='50'>");
    $("#map_from_title").text(RES_SEARCH_FROM);
    var e = $("<div class='ui-grid-a'/>"), d = $("<div id= 'map_from_type_div' class='ui-block-a'/>"), a = $("<div class='ui-block-b'/>");
    d.append(JJWG.create_select("map_from_type", true, (mobile_edition === "Pro")));
    d.append('<div id="MapErr"/>');
    a.append('<input type="text" data-mini="true" id="map_from_name">');
    e.append(d);
    e.append(a);
    $("#map_from").append(e);
    $("#map_from").append('<input type="hidden" id="map_from_id"><input type="hidden" id="map_from_adr"><input type="hidden" id="map_from_lat"><input type="hidden" id="map_from_lng"><ul id="map_from_nameL" data-role="listview" data-inset="true" data-theme="c"/>');
    if (mobile_app || mobile_edition === "Pro") {
        $("#map_search_type").bind("change", function(c)
        {
            JJWG.updateFilters()
        })
    }
    $("#map_from_type").bind("change", function(c)
    {
        $("#map_from_name").val("");
        $("#map_from_id").val("");
        $("#map_from_nameL").empty();
        if ($("#map_from_type").val() === "here") {
        } else {
        }
    });
    $("#map_from_name").on("input", function()
    {
        var n = $("#map_from_name").val(), l = $("#map_from_type").val(), m = $("#map_from_nameL");
        $("#map_from_id").val("");
        if (n.length < 1 || l === "here" || l === "address") {
            m.html("");
            m.listview("refresh")
        } else {
            var c = Beans[l];
            var h = c.table + "_cstm";
            var g = " " + Beans[l].SearchName + " LIKE '%" + n.replace("'", "''") + "%' AND ((" + h + ".jjwg_maps_lat_c != 0 OR " + h + ".jjwg_maps_lng_c != 0) AND (" + h + ".jjwg_maps_geocode_status_c IN ('OK','APPROXIMATE')))";
            QCRM.get_entry_list(l, g, c.ListFieldsToSelect(), "", 0, 10, Beans[l].OrderBy, function(s)
            {
                var p = s.entry_list, o = p.length;
                m.html("");
                for (var r = 0; r < o; r++) {
                    var u = p[r].name_value_list, w = $('<li data-icon="false"/>'), v = $("<a/>", {href: "#"}), q = Beans[l].DisplayTitle(u);
                    v.click({
                        id: p[r].id,
                        adr: u.jjwg_maps_address_c.value,
                        lng: u.jjwg_maps_lng_c.value,
                        lat: u.jjwg_maps_lat_c.value,
                        name: q
                    }, function(z)
                    {
                        $("#map_from_adr").val(z.data.adr);
                        $("#map_from_lat").val(z.data.lat);
                        $("#map_from_lng").val(z.data.lng);
                        $("#map_from_id").val(z.data.id);
                        $("#map_from_name").val(z.data.name.replace(/&#039;/g, "'"));
                        m.html("");
                        m.listview("refresh")
                    });
                    v.append(q);
                    w.append(v);
                    m.append(w)
                }
                m.listview("refresh")
            })
        }
    })
});
$("#JJWG").on("pageshow", function()
{
    QCRM.History.push("#JJWG");
    JJWG.updateFilters()
});
Beans.jjwg_Maps = new SugarBean("jjwg_Maps", "jjwg_maps", "basic");
Beans.jjwg_Maps.fullPage = true;
QCRM.jjwg_MapsSetup = function()
{
    Beans.jjwg_Maps.CreateHook = function()
    {
        $("#jjwg_MapsDetailsHdr").append('<div id="jjwgmap_canvas" style="width: 100%; height: 400px;"></div>')
    };
    Beans.jjwg_Maps.ViewDetailsHook = function(b)
    {
        var a = {};
        if (b.parent_id && b.parent_type) {
            a.id = b.parent_id.value;
            a.module = b.parent_type.value;
            if (!Beans[a.module] || !Beans[a.module].Enabled()) {
                return
            }
            Beans[a.module].get_entry(a.id, function(c)
            {
                try {
                    if (c && c.entry_list && c.entry_list[0]) {
                        c = c.entry_list[0].name_value_list;
                        if (c.jjwg_maps_geocode_status_c && (c.jjwg_maps_geocode_status_c.value === "OK" || c.jjwg_maps_geocode_status_c.value === "APPROXIMATE")) {
                            a.addr = c.jjwg_maps_address_c.value;
                            a.lat = c.jjwg_maps_lat_c.value;
                            a.lng = c.jjwg_maps_lng_c.value;
                            a.name = Beans[a.module].DisplayTitle(c);
                            JJWG.DisplayMap(b.module_type.value, b.distance.value, a, b.unit_type.value, "jjwgmap_canvas", "", false, false)
                        }
                    }
                } catch (d) {
                }
            })
        }
    }
};
JJWG.ShowMapSearch = function()
{
    $("#mapsearchdiv").show();
    $("body").pagecontainer("change", "#JJWG")
};
JJWG.AddressTpl = function(b, c)
{
    var d = c.id.value, a = '<a data-link="bean" data-identity="' + d + '" data-module="' + b + '" href="#">' + Beans[b].DisplayTitle(c) + "</a>";
    if (mobile_app && mobile_edition == "Pro") {
    } else {
        if (JJWG.gps_enabled) {
            a += '<a href="#" onclick="JJWG.DisplayDirections(\'' + b + "','" + d + "'," + c.jjwg_maps_lat_c.value + "," + c.jjwg_maps_lng_c.value + ');"><img style="float:right;" src="images/right_then_up.png"/></a>'
        }
    }
    a += "<br>" + c.jjwg_maps_address_c.value;
    if (c.parent_name && c.parent_name.value != "" && c.parent_id) {
        a += '<br><a data-link="bean" data-identity="' + c.parent_id.value + '" data-module="' + c.parent_type.value + '" href="#">' + c.parent_name.value + "</a>"
    }
    if (b == "Meetings") {
        a += "<br>" + jQuery.mobiscroll.formatDate(datetime_format, fromDBDateTime(c.date_start.value))
    }
    return a
};
JJWG.MarkerAddressTpl = function(d)
{
    var b = "jjwg_Markers", c = "#", e = d.id.value, a = "<b>" + Beans[b].DisplayTitle(d) + "</b>";
    if (mobile_app && mobile_edition == "Pro") {
        c = QCRM.map_url[QCRM.map_source].buildLink(d, b, d.description.value + "," + d.city.value, null, d.jjwg_maps_lat.value, d.jjwg_maps_lng.value, "OK");
        if (c != "#") {
            a += '<a href="' + c + '" target="_system"><img style="float:right;" src="images/right_then_up.png"/></a>'
        }
    }
    if (c == "#" && JJWG.gps_enabled) {
        a += '<a href="#" onclick="JJWG.DisplayDirections(\'' + b + "','" + e + "'," + d.jjwg_maps_lat.value + "," + d.jjwg_maps_lng.value + ');"><img style="float:right;" src="images/right_then_up.png"/></a>'
    }
    a += "<br>" + d.description.value;
    return a
};
JJWG.AddMapLink = function(e, b, d, c, a)
{
    if (c === undefined) {
        c = d.jjwg_maps_lat_c.value
    }
    if (a === undefined) {
        a = d.jjwg_maps_lng_c.value
    }
    e.click({coord: {lat: c, lng: a}, label: JJWG.AddressTpl(b, d), module: b, id: d.id.value}, function(g)
    {
        setTimeout(function()
        {
            JJWG.ShowMapBean(g.data.coord, g.data.label, g.data.module, g.data.id)
        }, 900)
    })
};
JJWG.ShowMapBean = function(l, c, e, h)
{
    $("#mapsearchdiv").hide();
    $("#map_legend").empty();
    var a = new google.maps.LatLng(l.lat, l.lng), g = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 14,
        center: a,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }), d = new google.maps.InfoWindow, b = new google.maps.Marker({position: a, map: g});
    google.maps.event.addListener(b, "click", (function(m, n)
    {
        return function()
        {
            d.setContent(n);
            d.open(g, m)
        }
    })(b, c));
    google.maps.event.trigger(g, "resize")
};
JJWG.ShowBeansInMap = function(e, d, F, o, u, w)
{
    var D, B, n, q, b, a = false, E = d.length, I, A, m = false, p = new google.maps.LatLng(F.lat, F.lng), g = [], G = new google.maps.Map(document.getElementById(o), {
        zoom: 10,
        center: p,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }), H = new google.maps.InfoWindow;
    if (Beans[e].ColoredField !== "") {
        a = Beans[e].ColoredField
    }
    for (D = 0; D < E; D++) {
        B = d[D].name_value_list;
        var z = new google.maps.LatLng(B.jjwg_maps_lat_c.value, B.jjwg_maps_lng_c.value);
        if (w && E > 1) {
            if (D == 0) {
                I = z
            } else {
                if (D == E - 1) {
                    A = z
                } else {
                    g.push({location: z})
                }
            }
        }
        q = {position: z, map: G};
        if (u) {
            q.icon = JJWG.markers[D % 25]
        } else {
            if (d[D].id === F.id) {
                m = true;
                q.icon = JJWG.centermarker
            } else {
                b = -1;
                if (a === "assigned_user_id") {
                    b = (B.assigned_user_id.value === CurrentUserId) ? 1 : 0
                } else {
                    if (B[a] !== undefined) {
                        var v = sugar_mod_fields[e][a], J = B[a].value;
                        if ((v.type === "bool" || v.type === "boolean")) {
                            b = (J === 1 || J === "1") ? 1 : 0
                        } else {
                            var s = sugar_app_list_strings[v.options], C = 0;
                            if (s !== undefined) {
                                for (var c in s) {
                                    if (c === J) {
                                        b = C;
                                        break
                                    }
                                    C++
                                }
                            }
                        }
                    }
                }
                if (b !== -1) {
                    q.icon = JJWG.markers[b % 25]
                }
            }
        }
        n = new google.maps.Marker(q);
        google.maps.event.addListener(n, "click", (function(K, L)
        {
            return function()
            {
                var M = JJWG.AddressTpl(e, L);
                H.setContent(M);
                H.open(G, K)
            }
        })(n, B))
    }
    if (w && E > 1) {
        var l, r = new google.maps.DirectionsService(), h = {
            origin: I,
            destination: A,
            waypoints: g,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        l = new google.maps.DirectionsRenderer({suppressMarkers: true});
        l.setMap(G);
        r.route(h, function(K, L)
        {
            if (L == google.maps.DirectionsStatus.OK) {
                l.setDirections(K)
            }
        })
    }
    if (F.id !== "" && !m && !u) {
        n = new google.maps.Marker({position: p, map: G, icon: JJWG.centermarker});
        google.maps.event.addListener(n, "click", (function(K)
        {
            return function()
            {
                H.setContent('<a href="#" data-module="' + F.module + '" data-identity="' + F.id + '">' + F.name + "</a><br>" + F.addr);
                H.open(G, K)
            }
        })(n))
    }
    BuildMapLegend(e, u);
    return G
};
JJWG.ShowMarkersInMap = function(l, g, c)
{
    var d, e, b, a, h = new google.maps.InfoWindow;
    QCRM.get_entry_list("jjwg_Markers", g, Beans.jjwg_Markers.ListFieldsToSelect(), "", 0, 150, "", function(p)
    {
        if (p) {
            var n = p.entry_list, m = n.length, o;
            for (o = 0; o < m; o++) {
                nvl = n[o].name_value_list;
                e = {
                    position: new google.maps.LatLng(nvl.jjwg_maps_lat.value, nvl.jjwg_maps_lng.value),
                    map: l,
                    icon: JJWG.Mmarkers[nvl.marker_image.value]
                };
                d = new google.maps.Marker(e);
                google.maps.event.addListener(d, "click", (function(q, r)
                {
                    return function()
                    {
                        var s = JJWG.MarkerAddressTpl(r);
                        h.setContent(s);
                        h.open(l, q)
                    }
                })(d, nvl))
            }
        }
    })
};
JJWG.distance = function(v, s, u)
{
    var e = 3.1459 / 180;
    var l = 6371, h = parseFloat(v.lat), g = parseFloat(s.lat), n = parseFloat(v.lng), m = parseFloat(s.lng), p = (g - h) * e, b = (m - n) * e, r = Math.sin(p / 2) * Math.sin(p / 2) + Math.cos(h * e) * Math.cos(g * e) * Math.sin(b / 2) * Math.sin(b / 2), q = 2 * Math.atan2(Math.sqrt(r), Math.sqrt(1 - r)), o = l * q;
    if (u === "miles") {
        o = o * 0.621371192
    }
    return o
};
JJWG.get_where = function(a, d, l, m)
{
    if (d !== "") {
        var o = Beans[a].table + ((QCRM.OffLine || a == "jjwg_Markers") ? "" : "_cstm"), b = o + ".jjwg_maps_lat" + ((a == "jjwg_Markers") ? "" : "_c"), n = o + ".jjwg_maps_lng" + ((a == "jjwg_Markers") ? "" : "_c"), h, g, e, c = "((" + b + " != 0 OR " + n + " != 0)  AND ";
        if (a != "jjwg_Markers") {
            c += "(" + o + ".jjwg_maps_geocode_status_c IN ('OK','APPROXIMATE')) AND "
        }
        if (true) {
            h = "(69.1 * ABS(" + b + " -(" + l.lat + ")))";
            g = "(53.0 * ABS(" + n + " -(" + l.lng + ")))";
            e = "( " + h + " + " + g + ")";
            d = "( 2 * " + d + ")"
        } else {
            h = "(69.1 * (" + b + " -(" + l.lat + ")))";
            g = "(53.0 * (" + n + " -(" + l.lng + ")) * COS((" + l.lat + ")/57.1))";
            e = "SQRT( " + h + " * " + h + " + " + g + " * " + g + ")"
        }
        if (m == "km") {
            e += " * 1.609"
        }
        c += "(" + e + " < " + d + "))";
        return c
    } else {
        return ""
    }
};
JJWG.DisplayDirections = function(e, d, n, o)
{
    var q, l, p = new google.maps.DirectionsService(), b, a = new google.maps.LatLng((JJWG.position.lat + n) / 2, (JJWG.position.lng + o) / 2), c = new google.maps.LatLng(JJWG.position.lat, JJWG.position.lng), h = new google.maps.LatLng(n, o), g = {
        zoom: 7,
        center: a
    }, m = $("body").pagecontainer("getActivePage").attr("id");
    q = new google.maps.DirectionsRenderer();
    b = new google.maps.Map(document.getElementById(m == "CalendarListPage" ? "calendar_canvas" : "map_canvas"), g);
    q.setMap(b);
    l = {origin: c, destination: h, travelMode: google.maps.TravelMode.DRIVING};
    p.route(l, function(r, s)
    {
        if (s == google.maps.DirectionsStatus.OK) {
            q.setDirections(r)
        }
    })
};
JJWG.DisplayMap = function(d, g, a, l, m, c, b, h)
{
    var e = JJWG.get_where(d, g, a, l);
    $("#MapErr").empty();
    if (g !== "") {
        if (c && c != "") {
            e = "((" + e + ") AND (" + c + "))"
        }
        QCRM.get_entry_list(d, e, Beans[d].ListFieldsToSelect(), "", 0, 150, "", function(w)
        {
            if (w) {
                var p = w.entry_list, r = [], s, q = 0, u = p.length, v = parseFloat(g), o;
                for (s = 0; s < u; s++) {
                    var n = p[s].name_value_list;
                    if (JJWG.distance({lat: n.jjwg_maps_lat_c.value, lng: n.jjwg_maps_lng_c.value}, a, l) < v) {
                        r[q] = p[s];
                        q++
                    }
                }
                p = r;
                o = JJWG.ShowBeansInMap(d, p, a, m, h, false);
                if (Beans.jjwg_Markers && $("#map_markers_opt").is(":checked")) {
                    JJWG.ShowMarkersInMap(o, JJWG.get_where("jjwg_Markers", g, a, l), a)
                }
            }
        })
    }
};
JJWG.SearchMap = function()
{
    var e = $("#map_search_type").val(), q = Beans[e].table, o = $("#map_from_type").val(), n = $("#map_search_dist").val(), a, h, b = "", g = false, p = new Date(), d = new Date(), l = "", m = false;

    function c(r, s)
    {
        JJWG.DisplayMap(e, n, a, JJWG.unit, "map_canvas", b, r, s);
        if (QCRM.mode === "mobile") {
            $("html, body").animate({scrollTop: $("#map_canvas").offset().top})
        }
    }

    $("#MapErr").empty();
    if (n !== "") {
        if (mobile_app || mobile_edition === "Pro") {
            g = $("#map_filter_search").val();
            p.setHours(0);
            p.setMinutes(0);
            d.setHours(23);
            d.setMinutes(59);
            if (g && g !== "" && g !== "0") {
                if (g === "myitems") {
                    b = q + ".assigned_user_id = '" + CurrentUserId + "'"
                } else {
                    if (g === "today" || g === "next_7_days") {
                        m = true;
                        l = "date_start";
                        if (g === "next_7_days") {
                            d.setDate(p.getDate() + 7)
                        }
                        b = "(" + q + ".assigned_user_id = '" + CurrentUserId + "') AND (" + q + ".date_start >= '" + toDBDateTime(p) + "') AND (" + q + ".date_start <= '" + toDBDateTime(d) + "')"
                    } else {
                        g = QCRM.SavedSearches[g];
                        b = get_where(g.type, g.fields)
                    }
                }
            }
        }
        if (o === "address") {
            QCRM.geocoder.geocode({address: $("#map_from_name").val()}, function(s, r)
            {
                if (r == google.maps.GeocoderStatus.OK) {
                    a = {
                        lat: s[0].geometry.location.lat(),
                        lng: s[0].geometry.location.lng(),
                        id: "",
                        module: "",
                        name: "",
                        addr: ""
                    };
                    c()
                } else {
                    var u = sugar_app_strings.MSG_LIST_VIEW_NO_RESULTS_BASIC === undefined ? "No results found." : sugar_app_strings.MSG_LIST_VIEW_NO_RESULTS_BASIC;
                    $("#MapErr").html("<em>" + $("#map_from_name").val() + ": " + u + "</em>")
                }
            });
            return
        } else {
            if (o === "here") {
                if (!JJWG.gps_enabled) {
                    $("#MapErr").html("<em>Position not available</em>");
                    return
                }
                a = {lat: JJWG.position.lat, lng: JJWG.position.lng, id: "", module: "", name: "", addr: ""}
            } else {
                h = $("#map_from_id").val();
                if (h === "") {
                    return
                }
                a = {
                    lat: $("#map_from_lat").val(),
                    lng: $("#map_from_lng").val(),
                    id: h,
                    module: o,
                    name: $("#map_from_name").val(),
                    addr: $("#map_from_adr").val()
                }
            }
        }
        c(l, m)
    }
};
JJWG.jjwgInitModule = function(a)
{
    Beans[a].ListFields = Beans[a].ListFields.concat(["jjwg_maps_lat_c", "jjwg_maps_lng_c", "jjwg_maps_address_c", "jjwg_maps_geocode_status_c"])
};
JJWG.jjwg_updatemodules = function(d)
{
    if (d !== "") {
        var c, e = [], a = d.split(",");
        for (c in a) {
            var b = a[c].trim();
            if (Beans[b]) {
                e.push(b)
            }
        }
        JJWG.modules = e
    }
};
JJWG.jjwg_init = function()
{
    var b, a, c = [];
    for (b in JJWG.modules) {
        a = JJWG.modules[b];
        if (Beans[a] && Beans[a].Enabled()) {
            c.push(a);
            JJWG.jjwgInitModule(a)
        }
    }
    JJWG.modules = c
};
JJWG.getCurrentPosition = function()
{
    var c = new Date();
    var b = {};
    if (QCRM.gpsHighAccuracy) {
        b = {enableHighAccuracy: true}
    }
    function a(e)
    {
    }

    function d(e)
    {
        JJWG.position.lat = e.coords.latitude;
        JJWG.position.lng = e.coords.longitude;
        JJWG.gps_enabled = true;
        if (JJWG.onPositionUpdate) {
            JJWG.onPositionUpdate(JJWG.position)
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(d, a, b)
    }
};
JJWG.jjwg_load = function(e)
{
    JJWG.gps_enabled = false;
    try {
        if (mobile_app || /android|iphone|ipad/i.test(navigator.userAgent)) {
            CronGPS()
        }
        if (google) {
            var a = {
                callback: function()
                {
                    var h, g = sugar_app_list_strings.marker_image_list;
                    enableButton("MapsLinkLabel", true);
                    JJWG.googlemaps = true;
                    JJWG.centermarker = new google.maps.MarkerImage("images/marker_0.png", new google.maps.Size(20, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34));
                    JJWG.markers = {};
                    for (h = 0; h < 25; h++) {
                        JJWG.markers[h] = new google.maps.MarkerImage("images/marker_" + (h + 1).toString() + ".png", new google.maps.Size(20, 34), new google.maps.Point(0, 0), new google.maps.Point(10, 34))
                    }
                    JJWG.Mmarkers = {};
                    if (Beans.jjwg_Markers && g) {
                        for (h in g) {
                            JJWG.Mmarkers[h] = new google.maps.MarkerImage(JJWG.MarkersDir + h + ".png")
                        }
                    }
                    QCRM.geocoder = new google.maps.Geocoder()
                }
            };
            var d = "3", b = QCRM.google_api_key || "AIzaSyBWa2TJ_7zL0VKMOKSh8ToSBkuIozlLrEI";
            a.other_params = "key=" + b;
            if (e) {
                a.callback = e
            }
            google.load("maps", d, a)
        }
    } catch (c) {
    }
};
QCRM.google_load = function()
{
    try {
        if (google) {
            google.load("maps", "3", {
                callback: function()
                {
                    QCRM.geocoder = new google.maps.Geocoder()
                }
            })
        }
    } catch (a) {
    }
};
if (sugar_mod_fields.Favorites) {
    Beans.Favorites = new SugarBean("Favorites", "favorites", "basic");
    Beans.Favorites.ShowTab = false;
    Beans.Favorites.Favorites = false;
    Beans.Favorites.SyncOptions = {sync: "All", max: false};
    sugar_mod_fields.Favorites.parent_id = "none";
    sugar_mod_fields.Favorites.parent_type = "none";
    Beans.Favorites.ListFields.push("parent_id", "parent_type");
    Beans.Favorites.OLExtraFields = ["parent_id", "parent_type"];
    Beans.Favorites.Init = function()
    {
        var a = "'" + QCRM.beans.join("','") + "'";
        Beans.Favorites.LimitWhere = "(@table.assigned_user_id = '" + CurrentUserId + "' AND parent_type IN (" + a + "))"
    }
}
if (typeof aos_installed !== "undefined") {
    if (aos_installed !== false && Q_API >= "2.5" && js_plugins.indexOf("AOS.js") === -1) {
        QCRM.AOS_standard = true;
        QCRM.AOS_show_image = !QCRM.OffLine;
        QCRM.AOS_groups = (aos_params && aos_params.lineItems) ? aos_params.lineItems.enableGroups : false;
        QCRM.AOSModValues = ["total_amt", "discount_amount", "subtotal_amount", "shipping_amount", "shipping_tax_amt", "shipping_tax", "tax_amount", "total_amount"];
        QCRM.AOSGroupValues = ["name", "id", "deleted", "total_amt", "discount_amount", "subtotal_amount", "tax_amount", "total_amount", "group_number"];
        QCRM.AOSProdValues = ["name", "id", "description", "part_number", "deleted", "item_description", "product_qty", "product_cost_price", "product_list_price", "product_discount", "product_discount_amount", "discount", "product_unit_price", "vat_amt", "product_total_price", "vat", "product_id", "group_number"];
        QCRM.AOSServValues = ["name", "id", "deleted", "product_list_price", "product_discount", "product_discount_amount", "discount", "product_unit_price", "vat_amt", "product_total_price", "vat", "product_id", "group_number"];
        QCRM.AOS_prodln = 0;
        QCRM.AOS_servln = 0;
        QCRM.AOS_groupn = 0;
        QCRM.AOS_group_ids = {};
        QCRM.CurrentModule = "";
        QCRM.AOS_totaltax = (aos_params && aos_params.lineItems) ? aos_params.lineItems.totalTax : false;
        Beans.AOS_Products = new SugarBean("AOS_Products", "aos_products", "basic", true);
        Beans.AOS_Products.SyncDefaults = {sync: "All", max: false};
        Beans.AOS_Products.ListFields = ["name", "product_list_price"];
        Beans.AOS_Products.EditExcluded.push("product_image");
        QCRM.Custom_AOS_Products_product_image = function(c, a)
        {
            var b = ServerAddress + c.substring(c.indexOf("/upload/"));
            if (QCRM.AOS_show_image) {
                return '<img class="productimage" src="' + b + '">'
            }
            return ""
        };
        if (aos_installed > "5.3") {
            QCRM.SetSearchNameFields("AOS_Products", ["name", "part_number"]);
            Beans.AOS_Products.ListFields.push("part_number");
            Beans.AOS_Products.TitleTpl = "{[part_number]} {name}"
        }
        Beans.AOS_Product_Categories = new SugarBean("AOS_Product_Categories", "aos_product_categories", "basic", true);
        Beans.AOS_Product_Categories.SyncDefaults = {sync: "All", max: false};
        Beans.AOS_Product_Categories.HomeIcon = false;
        Beans.AOS_Product_Categories.ListFields = ["name"];
        Beans.AOS_Line_Item_Groups = new SugarBean("AOS_Line_Item_Groups", "aos_line_item_groups", "basic", true);
        Beans.AOS_Line_Item_Groups.HomeIcon = false;
        Beans.AOS_Line_Item_Groups.ShowTab = false;
        Beans.AOS_Line_Item_Groups.ListFields = ["name", "total_amt", "discount_amount", "subtotal_amount", "tax_amount", "subtotal_tax_amount", "total_amount", "parent_type", "parent_id"];
        Beans.AOS_Line_Item_Groups.SyncOptions = {sync: "Rel", max: false};
        Beans.AOS_Line_Item_Groups.DisplaySubpanelElt = function(a)
        {
            if (!QCRM.AOS_groups || !a) {
                return ""
            }
            return '<p style="text-align:right;font-weight:bold;">' + sugarLabel(QCRM.CurrentModule, "LBL_SUBTOTAL_AMOUNT") + ": " + formatCurrency(a.subtotal_amount.value) + "<br>" + sugarLabel(QCRM.CurrentModule, "LBL_GROUP_TOTAL") + ": " + formatCurrency(a.total_amount.value) + "</p>"
        };
        function findInsertBefore(b)
        {
            var a = Beans[b].AdditionalFields;
            if (a) {
                Beans[b].LinesBefore = "";
                for (var d in a) {
                    var c = a[d];
                    if (c === "subtotal_amount" || c === "total_amount" || c === "total_amt") {
                        Beans[b].LinesBefore = c;
                        break
                    }
                }
            }
        }

        function AOSViewDetailsHook(a, c, b)
        {
            Beans[a].CurrentCustomData.groups = {}
        }

        function AOSViewDetailsFtrHook(b, o, s, z)
        {
            var d = Beans[b], m, w, u, e, l, n, p = "", v = "", q = "", c = "", a = "", g = {}, r, h;
            QCRM.CurrentModule = b;
            if (Q_API < "3.0") {
                if (d.CurrentCustomData.line_items.length > 0 && sugar_mod_fields.AOS_Products_Quotes) {
                    m = $("<li/>");
                    w = $("<div/>");
                    for (var r = 0; r < d.CurrentCustomData.line_items.length; r++) {
                        e = d.CurrentCustomData.line_items[r];
                        w.append('<div class="ui-grid-b">' + Beans.AOS_Products_Quotes.DisplaySubpanelElt(e) + "</div>")
                    }
                    m.append(w);
                    if (Beans[b].LinesBefore !== "") {
                        m.insertBefore("#" + b + Beans[b].LinesBefore + "V")
                    } else {
                        $(z).append(m)
                    }
                }
            } else {
                $(".itemMain").remove();
                if (QCRM.OffLine) {
                }
                if (QCRM.AOS_groups && s.groups && s.groups.length > 0) {
                    for (r = 0; r < s.groups.length; r++) {
                        var l = s.groups[r];
                        if (QCRM.OffLine) {
                            l = Record2NVL(l)
                        }
                        if (l.id) {
                            g[l.id.value] = l
                        }
                    }
                }
                if (s.lineitems && s.lineitems.length > 0) {
                    m = $('<li class="itemTableLi" />');
                    w = $("<div/>");
                    for (r = 0; r < s.lineitems.length; r++) {
                        e = s.lineitems[r];
                        if (QCRM.OffLine) {
                            e = Record2NVL(e)
                        }
                        n = e.group_id.value;
                        if (QCRM.AOS_groups && n && (p != n || r == 0)) {
                            if (r != 0) {
                                w.append(c + a + q)
                            }
                            l = g[n];
                            c = "";
                            a = "";
                            if (l && l.name.value != "") {
                                w.append('<p style="font-weight:bold;">' + sugarLabel(b, "LBL_GROUP_NAME") + ": " + l.name.value + "</p>")
                            }
                            p = n
                        }
                        q = Beans.AOS_Line_Item_Groups.DisplaySubpanelElt(l);
                        h = '<div class="ui-grid-b">' + Beans.AOS_Products_Quotes.DisplaySubpanelElt(e) + "</div>";
                        if (e.product_id.value == "0") {
                            a += h
                        } else {
                            c += h
                        }
                    }
                    w.append(c + a + q);
                    m.append(w);
                    if (Beans[b].LinesBefore !== "") {
                        m.insertBefore("#" + b + Beans[b].LinesBefore + "V")
                    } else {
                        $(z).append(m)
                    }
                }
            }
        }

        function AOSget_entry(b, e, d)
        {
            var c = Beans[b], a = '[{"name":"aos_products_quotes","value":["' + Beans.AOS_Products_Quotes.ListFields.join('","') + '"]}]';
            if (QCRM.OffLine) {
            } else {
                if (Q_API >= "3.0") {
                    SugarQuery("AOSget_entry", '{"session":"' + SugarSessionId + '","module_name":"' + b + '","id":"' + e + '","select_fields":"","link_name_to_fields_array":""}', d, null)
                } else {
                    QCRM.get_entry_list(b, c.table + ".id='" + c.CurrentId + "'", '""', a, 0, 1, "", function(m)
                    {
                        var h, g, n = [];
                        try {
                            if (m && m.relationship_list[0].link_list[0]) {
                                h = m.relationship_list[0].link_list[0].records;
                                g = h.length;
                                for (var l = 0; l < g; l++) {
                                    n[l] = h[l].link_value
                                }
                            }
                        } catch (o) {
                        }
                        c.CurrentCustomData.line_items = n;
                        d(m)
                    })
                }
            }
        }

        function AOSset_entry(a, d, b, c)
        {
            if (d === "") {
                if (b.assigned_user_id === undefined || b.assigned_user_id.value === "") {
                    b.assigned_user_id = {name: "assigned_user_id", value: CurrentUserId}
                }
            } else {
                if (b.id === undefined || b.id.value !== d) {
                    b.id = {name: "id", value: d}
                }
            }
            if (QCRM.OffLine || Q_API < "3.0") {
                QCRM.webdb.set_entry(a, d, b, c)
            } else {
                SugarQuery("AOSset_entry", JSON.stringify({
                    session: SugarSessionId,
                    module_name: a,
                    name_value_list: b
                }, null, 2), c, null)
            }
        }

        function AOSCheckForm(d)
        {
            var e = "", c;
            if (!QCRM.OffLine && Q_API >= "3.0") {
                for (c = 0; c < QCRM.AOS_prodln; c++) {
                    var b = "product_product_id" + c.toString(), a = "product_deleted" + c.toString();
                    if (document.getElementById(a).value != "1" && document.getElementById(b).value == "") {
                        e += "<br>" + sugarLabel(d, "LBL_PRODUCT_NAME") + ": " + RES_REQUIRED_MSG
                    }
                }
            }
            return e
        }

        function AOSCustomValues(b, s, a)
        {
            var n = {}, r = "", q = {}, l, h, o;
            if (a) {
                if (CurrentRecordValues.module === "Accounts" && Beans.Accounts.CurrentId !== "") {
                    r = Beans.Accounts.CurrentId
                } else {
                    if (CurrentRecordValues.module === "Contacts" && Beans.Contacts.CurrentId !== "" && CurrentRecordValues.account_id !== undefined && CurrentRecordValues.account_id.value !== "") {
                        r = CurrentRecordValues.account_id.value
                    }
                }
                if (r !== "") {
                    n.billing_account_id = {name: "billing_account_id", value: r}
                }
                if (CurrentRecordValues.module === "Contacts" && Beans.Contacts.CurrentId !== "") {
                    n.billing_contact_id = {name: "billing_contact_id", value: Beans.Contacts.CurrentId}
                }
            }
            if (!QCRM.OffLine && Q_API >= "3.0") {
                var e = {}, d = {};
                for (l in QCRM.AOSModValues) {
                    o = QCRM.AOSModValues[l];
                    n[o] = {name: o, value: get_value(o)}
                }
                if (QCRM.AOS_groups) {
                    for (l = 0; l < QCRM.AOS_groupn; l++) {
                        for (h in QCRM.AOSGroupValues) {
                            var p = "group_" + QCRM.AOSGroupValues[h], g = document.getElementById("group" + l.toString() + QCRM.AOSGroupValues[h]), c = g.value || "", m = unformat2Number(c);
                            if (format2Number(m) === c) {
                                c = m
                            }
                            if (e[p] === undefined) {
                                e[p] = []
                            }
                            e[p].push(c)
                        }
                    }
                }
                for (l = 0; l < QCRM.AOS_prodln; l++) {
                    for (h in QCRM.AOSProdValues) {
                        var p = "product_" + QCRM.AOSProdValues[h], g = document.getElementById(p + l.toString()), c = g.value || "", m = unformat2Number(c);
                        if (QCRM.AOSProdValues[h] !== "vat" && QCRM.AOSProdValues[h] !== "group_number" && (QCRM.AOSProdValues[h] === "product_discount_amount" || format2Number(m) === c)) {
                            c = m
                        }
                        if (e[p] === undefined) {
                            e[p] = []
                        }
                        e[p].push(c)
                    }
                }
                for (l = 0; l < QCRM.AOS_servln; l++) {
                    for (h in QCRM.AOSServValues) {
                        var p = "service_" + QCRM.AOSServValues[h], g = document.getElementById(p + l.toString()), c = g.value || "", m = unformat2Number(c);
                        if (QCRM.AOSServValues[h] !== "vat" && QCRM.AOSServValues[h] !== "group_number" && (QCRM.AOSServValues[h] === "product_discount_amount" || format2Number(m) === c)) {
                            c = m
                        }
                        if (e[p] === undefined) {
                            e[p] = []
                        }
                        e[p].push(c)
                    }
                }
                n.lineitems = {name: "lineitems", value: e}
            } else {
                if (QCRM.OffLine && Q_API >= "3.0") {
                }
            }
            return n
        }

        function AOSInitEditForm(a)
        {
            Beans[a].LineItemsDiv = "#Edit" + a + "Ftr"
        }

        function AOSInitEdit(b, n)
        {
            QCRM.AOS_prodln = 0;
            QCRM.AOS_servln = 0;
            QCRM.AOS_groupn = 0;
            QCRM.AOS_group_ids = {};
            QCRM.CurrentModule = b;
            $(".LineItems").remove();
            var c, a = {}, d = "<table width='100%' border='0' style='vertical-align:top;' class='LineItems' cellspacing='4' id='lineItems'></table>";
            if (QCRM.AOS_groups) {
                d += "<div style='padding-top: 10px; padding-bottom:10px;'>";
                d += '<input type="button" tabindex="116" class="button" value="' + sugar_mod_strings[b]["LBL_ADD_GROUP"] + '" id="addGroup" onclick="insertGroup(0)" >';
                d += "</div>"
            }
            d += '<input type="hidden" name="vathidden" id="vathidden" value=\'' + get_select_options(sugar_app_list_strings.vat_list, "", false) + "'>";
            d += '<input type="hidden" name="discounthidden" id="discounthidden" value=\'' + get_select_options(sugar_app_list_strings.discount_list, "", false) + "'>";
            $(Beans[b].LineItemsDiv).html(d);
            if (!QCRM.AOS_groups) {
                insertGroup()
            }
            for (c in QCRM.AOSModValues) {
                var g = QCRM.AOSModValues[c];
                if (g !== "shipping_tax") {
                    $(Beans[b].LineItemsDiv).append(create_text_form(g, display_label(b, g), false, false, true))
                }
                if (g === "shipping_tax_amt") {
                }
            }
            $("#shipping_amount").blur(function()
            {
                calculateTotal("lineItems")
            });
            $("#shipping_tax_amt").after("<select name='shipping_tax' data-mini='true' data-inline='true' id='shipping_tax' onchange='calculateTotal(\"lineItems\");' >" + get_select_options(sugar_app_list_strings.vat_list, "", false) + "</select>");
            $(Beans[b].LineItemsDiv).trigger("create");
            if (QCRM.OffLine) {
            }
            if (n.groups && n.groups.length > 0) {
                for (c = 0; c < n.groups.length; c++) {
                    var l = n.groups[c], e = "0";
                    if (!QCRM.OffLine) {
                        l = NVL2Record(l)
                    }
                    a[l.id] = l;
                    if (l.deleted == "1") {
                        d = "<input type='hidden' id='group" + c.toString() + "deleted' value='1'><input type='hidden' id='group" + c.toString() + "id' value='" + l.id + "'><input type='hidden' id='group" + c.toString + "group_number' value='" + c.toString() + "'>";
                        if (l.new_with_id) {
                            d += "<input type='hidden' id='group" + c.toString() + "new_with_id' value='" + l.new_with_id + "'>"
                        }
                        $(Beans[b].LineItemsDiv).append(d)
                    }
                }
            }
            if (n.lineitems && n.lineitems.length > 0) {
                for (c = 0; c < n.lineitems.length; c++) {
                    var m = n.lineitems[c];
                    if (!QCRM.OffLine) {
                        m = NVL2Record(m)
                    }
                    var l = "", h;
                    if (m.group_id != "") {
                        l = a[m.group_id]
                    }
                    insertLineItems(m, l)
                }
            }
        }

        function AOSSetup(a)
        {
            QCRM.AddToListFields(a, QCRM.AOSModValues);
            QCRM.SetFieldHook(a, "billing_contact", "initial_filter", function(b)
            {
                var c = QCRM.toDBField(a, "billing_account", b);
                if (c && c !== "") {
                    return "account_name LIKE '" + c.replace(/'/g, "''") + "'"
                }
                return ""
            });
            QCRM.SetFieldHook(a, "billing_account", "copyfields", [{
                copy: "shipping",
                from: "shipping"
            }, {copy: "billing", from: "billing"}])
        }

        Beans.AOS_Quotes = new SugarBean("AOS_Quotes", "aos_quotes", "basic", true);
        Beans.AOS_Quotes.ListFields = ["name", "number", "total_amount", "billing_account"];
        Beans.AOS_Quotes.OLExtraFields = ["lineitems", "groups"];
        Beans.AOS_Quotes.EditExcluded = ["created_by_name", "modified_by_name", "number"].concat(QCRM.AOSModValues);
        QCRM.AOS_QuotesSetup = function()
        {
            AOSSetup("AOS_Quotes")
        };
        Beans.AOS_Quotes.ListViewTpl = "<h4>{number} - {name}</h4><p>{total_amount}&nbsp;{billing_account}</p>";
        Beans.AOS_Quotes.Links.aos_products_quotes = {module: "AOS_Products_Quotes", create: false, select: false};
        Beans.AOS_Quotes.SearchFields = ["number"];
        Beans.AOS_Quotes.OrderBy = "number";
        Beans.AOS_Quotes.CurrentCustomData = {};
        Beans.AOS_Quotes.default_group_id = "";
        QCRM.SetModuleHook("AOS_Quotes", "check_edit", function(a)
        {
            return Q_API >= "3.0"
        });
        Beans.AOS_Quotes.get_entry = function(b, a)
        {
            AOSget_entry("AOS_Quotes", b, a)
        };
        if (Q_API >= "3.0") {
            Beans.AOS_Quotes.set_entry = function(c, a, b)
            {
                AOSset_entry(this.name, c, a, b)
            };
            Beans.AOS_Quotes.EditHook = function(a, c, b)
            {
                AOSInitEdit("AOS_Quotes", b)
            };
            Beans.AOS_Quotes.CustomCheck = function(a)
            {
                return AOSCheckForm("AOS_Quotes")
            };
            Beans.AOS_Quotes.CreateBtnHook = function()
            {
                this.CurrentCustomData = {}
            };
            Beans.AOS_Quotes.CustomValues = function(b, a)
            {
                return AOSCustomValues("AOS_Quotes", b, a)
            };
            QCRM.SetModuleHook("AOS_Quotes", "init_edit", function()
            {
                AOSInitEditForm("AOS_Quotes")
            })
        }
        Beans.Accounts.Links.aos_quotes = {module: "AOS_Quotes", create: true, select: false};
        Beans.Contacts.Links.aos_quotes = {module: "AOS_Quotes", create: true, select: false};
        Beans.AOS_Invoices = new SugarBean("AOS_Invoices", "aos_invoices", "basic", true);
        Beans.AOS_Invoices.ListFields = ["name", "number", "total_amount", "billing_account"];
        Beans.AOS_Quotes.OLExtraFields = ["lineitems", "groups"];
        Beans.AOS_Invoices.EditExcluded = ["created_by_name", "modified_by_name", "number"].concat(QCRM.AOSModValues);
        Beans.AOS_Invoices.ListViewTpl = "<h4>{number} - {name}</h4><p>{total_amount}&nbsp;{billing_account}</p>";
        Beans.AOS_Invoices.OrderBy = "number";
        QCRM.AOS_InvoicesSetup = function()
        {
            AOSSetup("AOS_Invoices")
        };
        Beans.AOS_Invoices.Links.aos_products_quotes = {module: "AOS_Products_Quotes", create: false, select: false};
        Beans.AOS_Invoices.SearchFields = ["number"];
        Beans.AOS_Invoices.default_group_id = "";
        Beans.AOS_Invoices.CurrentCustomData = {};
        QCRM.SetModuleHook("AOS_Invoices", "check_edit", function(a)
        {
            return Q_API >= "3.0"
        });
        Beans.Accounts.Links.aos_invoices = {module: "AOS_Invoices", create: true, select: false};
        Beans.Contacts.Links.aos_invoices = {module: "AOS_Invoices", create: true, select: false};
        Beans.AOS_Invoices.CreateBtnHook = function()
        {
            this.CurrentCustomData = {}
        };
        Beans.AOS_Invoices.get_entry = function(b, a)
        {
            AOSget_entry("AOS_Invoices", b, a)
        };
        if (Q_API >= "3.0") {
            Beans.AOS_Invoices.set_entry = function(c, a, b)
            {
                AOSset_entry(this.name, c, a, b)
            };
            Beans.AOS_Invoices.CustomValues = function(b, a)
            {
                return AOSCustomValues("AOS_Invoices", b, a)
            };
            Beans.AOS_Invoices.EditHook = function(a, c, b)
            {
                AOSInitEdit("AOS_Invoices", b)
            };
            QCRM.SetModuleHook("AOS_Invoices", "init_edit", function()
            {
                AOSInitEditForm("AOS_Invoices")
            });
            Beans.AOS_Invoices.CustomCheck = function(a)
            {
                return AOSCheckForm("AOS_Invoices")
            }
        }
        function pickProduct(c, d, a, l)
        {
            var h = Beans.AOS_Products, b = "#", g = $(b + c), m = g.val(), e = $(b + c + "L");
            $(b + d).val("");
            if (m.length < 1) {
                e.hide();
                e.html("");
                e.listview("refresh")
            } else {
                QCRM.get_entry_list("AOS_Products", matchName(h, "default", m.replace("'", "''")), h.ListFieldsToSelect(), "", 0, 10, h.OrderBy, function(q)
                {
                    var o = q.entry_list, n = o.length;
                    e.html("");
                    if (n > 0) {
                        e.show()
                    } else {
                        e.hide()
                    }
                    for (var p = 0; p < n; p++) {
                        var u = $('<li data-icon="false"/>'), r = $("<a/>", {href: "#"}), s = h.DisplayTitle(o[p].name_value_list);
                        r.click({nvl: o[p].name_value_list, name: s}, function(w)
                        {
                            var v = w.data.nvl, z = v.id.value;
                            $(b + d).val(z);
                            $.each(a, function(A, C)
                            {
                                var B = $(b + C.name);
                                if (B && v[C.copy]) {
                                    B.val(v[C.copy].value)
                                }
                            });
                            g.val(v.name.value.replace(/&#039;/g, "'").replace(/&quot;/g, '"'));
                            e.hide();
                            e.html("");
                            e.listview("refresh");
                            if (l !== undefined) {
                                l(z)
                            }
                        });
                        r.append('<span style="font-size: smaller;">' + s + "</span>");
                        u.append(r);
                        e.append(u)
                    }
                    e.listview("refresh")
                })
            }
        }

        Beans.AOS_Products_Quotes = new SugarBean("AOS_Products_Quotes", "aos_products_quotes", "basic", true);
        Beans.AOS_Products_Quotes.ShowTab = false;
        Beans.AOS_Products_Quotes.HomeIcon = false;
        Beans.AOS_Products_Quotes.LastViewed = false;
        Beans.AOS_Products_Quotes.SyncOptions = {sync: "Rel", max: false};
        Beans.AOS_Products_Quotes.ListFields = ["name", "number", "parent_name", "product_id", "product_qty", "product_unit_price", "product_discount", "product_discount_amount", "vat_amt", "product_total_price", "parent_type", "parent_id", "product_image_c"];
        Beans.AOS_Products_Quotes.OrderBy = "number";
        Beans.AOS_Products_Quotes.DefaultParent = {name: "parent_name", id_name: "parent_id", module: "parent_type"};
        Beans.AOS_Products_Quotes.AfterSaveLandingPage = function(b, a)
        {
            Beans[this.CurrentParentType].CurrentId = this.CurrentParentId;
            $("body").pagecontainer("change", "#" + this.CurrentParentType + "DP", {reverse: true})
        };
        Beans.AOS_Products_Quotes.ViewDetailsHook = function(a)
        {
            this.CurrentParentId = a.parent_id.value;
            this.CurrentParentType = a.parent_type.value;
            this.CurrentParentName = a.parent_name.value
        };
        QCRM.SetAppHook("after_login", function()
        {
            if (typeof QCRM.AOS === "function") {
                return
            }
            Beans.AOS_Products_Quotes.AddBtn = false;
            if (sugar_mod_fields.AOS_Products_Quotes) {
                try {
                    sugar_mod_fields.AOS_Products_Quotes.name.type = "varchar";
                    sugar_mod_fields.AOS_Products_Quotes.name.copyfields = [{
                        copy: "product_list_price",
                        from: "price"
                    }];
                    sugar_mod_fields.AOS_Products_Quotes.product_list_price.readonly = true;
                    sugar_mod_fields.AOS_Products_Quotes.vat_amt.readonly = true;
                    sugar_mod_fields.AOS_Products_Quotes.product_total_price.readonly = true;
                    sugar_mod_fields.AOS_Products_Quotes.product_discount_amount.readonly = true
                } catch (a) {
                }
            }
            if (aos_installed > "5.2") {
                if (sugar_mod_fields.AOS_Products_Quotes) {
                    sugar_mod_fields.AOS_Products_Quotes.name.copyfields.push({
                        copy: "part_number",
                        from: "part_number"
                    })
                }
                Beans.AOS_Products_Quotes.ListFields.push("part_number");
                Beans.AOS_Products.ListFields.push("part_number")
            }
            updatePreferences(false);
            if (sugar_mod_strings.AOS_Product_Categories !== undefined) {
                sugar_mod_strings.AOS_Product_Categories.LBL_AOS_PRODUCT_CATEGORIES_AOS_PRODUCTS_FROM_AOS_PRODUCTS_TITLE = sugar_app_list_strings.moduleList.AOS_Products
            }
            Beans.AOS_Quotes.Links.aos_products_quotes.display = function(b)
            {
            };
            Beans.AOS_Invoices.Links.aos_products_quotes.display = function(b)
            {
            };
            Beans.AOS_Quotes.ViewDetailsHook = function(b)
            {
                AOSViewDetailsHook(this.name, this.CurrentId, b)
            };
            Beans.AOS_Quotes.ViewDetailsFtrHook = function(c, b)
            {
                AOSViewDetailsFtrHook(this.name, this.CurrentId, c, b)
            };
            Beans.AOS_Invoices.ViewDetailsHook = function(b)
            {
                AOSViewDetailsHook(this.name, this.CurrentId, b)
            };
            Beans.AOS_Invoices.ViewDetailsFtrHook = function(c, b)
            {
                AOSViewDetailsFtrHook(this.name, this.CurrentId, c, b)
            };
            Beans.AOS_Products_Quotes.Templates = {
                product: {
                    name: "{name}{[part_number]}",
                    details: "{product_qty} * {product_unit_price}",
                    total: "{product_total_price}"
                }, service: {name: "{name}", details: "", total: "{product_total_price}"}
            };
            Beans.AOS_Products_Quotes.DisplaySubpanelElt = function(b)
            {
                var e = "", c = (b.product_id.value === "0" || b.product_id.value === undefined || b.product_id.value === "") ? "service" : "product", d = Beans.AOS_Products_Quotes.Templates[c];
                if (c == "product") {
                    if (QCRM.AOS_show_image && b.product_image_c && b.product_image_c.value !== "") {
                        e = b.product_image_c.value;
                        e = ServerAddress + e.substring(e.indexOf("/upload/"));
                        e = '<p><img class="productimage" src="' + e + '"></p>'
                    }
                    return getFromTemplate(this.name, b, '<div class="ui-block-a" style="width:45%;"><p style="white-space:normal;font-weight:bold;">' + d.name + "</p>" + e + '</div><div class="ui-block-b" style="width:30%;text-align:right;"><p style="white-space:normal;">' + d.details + '</p></div><div class="ui-block-c" style="width:25%;text-align:right;"><p>' + d.total + "</p></div>")
                } else {
                    return getFromTemplate(this.name, b, '<div class="ui-block-a" style="width:75%;"><p style="white-space:normal;font-weight:bold;">' + d.name + '</p></div><div class="ui-block-b" style="width:2%;"></div><div class="ui-block-c" style="width:23%;text-align:right;"><p>&nbsp;' + d.total + "</p></div>")
                }
            };
            findInsertBefore("AOS_Quotes");
            findInsertBefore("AOS_Invoices")
        })
    }
}
Beans.AOR_Reports = new SugarBean("AOR_Reports", "aor_reports", "basic");
Beans.AOR_Reports.fullPage = true;
QCRM.AOR_ReportsSetup = function()
{
    Beans.AOR_Reports.Favorites = true;
    Pref.SyncModules.AOR_Reports = {preset: true, sync: "None", max: false};
    if (QCRM.OffLine || Q_API < "2.8") {
        return
    }
    QCRM.SetModuleHook("AOR_Reports", "init_view", function()
    {
        $("#AOR_ReportsDetailsList").append("<li>" + getNavButtons("AOR_ReportsDetailsList") + "</li>")
    });
    Beans.AOR_Reports.acl.edit = false;
    Beans.AOR_Reports.acl.del = false;
    Beans.AOR_Reports.ViewDetails = function()
    {
        var d = this, e = this.CurrentId, a = RowsPerPage, c = $("#AOR_ReportsDetailsHdr");

        function b(h)
        {
            var g = "AOR_ReportsDetailsList";
            $("#" + g + " li:gt(0)").remove();
            enableButton(g + "L", h > 0);
            SugarQuery("get_report", '{"session":"' + SugarSessionId + '","id":"' + e + '", "offset":"' + h + '","max_results":"' + a.toString() + '","language":"' + getSugarLanguage(sugar_languages, default_language) + '"}', function(w)
            {
                var v = 0, m = $("#" + g), z = 0, p = 0, A = h + a;
                if (w && w.entry_list) {
                    var r, q, n, u = '<table data-role="table" data-mode="reflow" data-link="zoom" id="AOR_reportTable" class="ui-responsive table-stroke reportTable" style="width:100%;">', s = w.entry_list.header, B = w.entry_list.values, o = w.entry_list.values.length, C = w.entry_list.total;
                    v = w.entry_list.count;
                    $("#AOR_ReportsNameH1").html(w.entry_list.name);
                    showFavoriteStatus("AOR_Reports", e, w.entry_list.name);
                    if (d.LastViewed) {
                        PushViewed(d.name, d.CurrentId, w.entry_list.name)
                    }
                    $("#" + g + "T").html(v === 0 ? "-" : ((h + 1).toString() + "-" + (A > v ? v : A).toString() + "/&shy;" + v.toString()));
                    u += "<thead><tr>";
                    for (r = 0; r < s.length; r++) {
                        u += '<th class="reportCell" style="background-color: #c5c5c5;" align="left">' + s[r] + "</th>"
                    }
                    u += "</tr></thead><tbody>";
                    for (r = 0; r < o; r++) {
                        var l = "";
                        if (C) {
                            if (r == o - 2) {
                                l = " class='report_totals_hdr'"
                            } else {
                                if (r == o - 1) {
                                    l = " class='report_totals_val'"
                                }
                            }
                        }
                        u += "<tr" + l + ">";
                        for (q = 0; q < B[r].length; q++) {
                            u += "<td  class='reportCell'>";
                            n = B[r][q];
                            if (typeof n === "object") {
                                n = n[0]
                            }
                            u += n;
                            u += "</td>"
                        }
                        u += "</tr>"
                    }
                    u += "</tbody></table>";
                    m.append('<li data-theme="d" style="padding: 0 !important">' + u + "</li>");
                    if ($("#AOR_reportTable").width() > $("AOR_ReportsNameH1").width()) {
                        $("#AOR_reportTable").table().trigger("create")
                    }
                    p = h - 20;
                    enableButton(g + "L", p >= 0);
                    if (p < 0) {
                        p = 0
                    }
                    z = h + 20;
                    enableButton(g + "R", z < v);
                    if (z > v) {
                        z = h
                    }
                } else {
                    $("#" + g + "T").empty()
                }
                m.listview("refresh");
                $("#" + g + "L").unbind("click");
                $("#" + g + "R").unbind("click");
                $("#" + g + "L").click({offset: p}, function(D)
                {
                    b(D.data.offset)
                });
                $("#" + g + "R").click({offset: z}, function(D)
                {
                    b(D.data.offset)
                })
            })
        }

        c.html("");
        SugarQuery("get_chart", '{"session":"' + SugarSessionId + '","id":"' + e + '", "chart_id":"", "width":"700","height":"700","language":"' + getSugarLanguage(sugar_languages, default_language) + '"}', function(l)
        {
            var g, h = "100";
            if (l && l.entry_list && l.entry_list.charts) {
                if (l.entry_list.charts.length > 1 && QCRM.mode === "tablet") {
                    h = "45"
                }
                for (g = 0; g < l.entry_list.charts.length; g++) {
                    c.append(l.entry_list.charts[g].chart.replace("<img ", '<img width="' + h + '%" '))
                }
                c.show()
            }
        });
        b(0)
    }
};
Beans.KReports = new SugarBean("KReports", "kreports", "basic");
Beans.KReports.fullPage = true;
QCRM.KReportsSetup = function()
{
    Beans.KReports.Favorites = true;
    Pref.SyncModules.KReports = {preset: true, sync: "None", max: false};
    if (QCRM.OffLine || Q_API < "2.8") {
        return
    }
    QCRM.SetModuleHook("KReports", "init_view", function()
    {
        var b = "KReportsDetailsList", a = Beans.KReports;
        $("#" + b).append("<li>" + getNavButtons(b) + "</li>")
    });
    Beans.KReports.acl.edit = false;
    Beans.KReports.acl.del = false;
    Beans.KReports.CheckEdit = function(a)
    {
        return false
    };
    Beans.KReports.ViewDetails = function()
    {
        var b = this, c = this.CurrentId;

        function a(g)
        {
            var e = "KReportsDetailsList", d = RowsPerPage;
            $("#" + e + " li:gt(0)").remove();
            enableButton(e + "L", g > 0);
            SugarQuery("get_Kreport", '{"session":"' + SugarSessionId + '","id":"' + c + '", "offset":"' + g + '","max_results":"' + d.toString() + '","language":"' + getSugarLanguage(sugar_languages, default_language) + '"}', function(C)
            {
                var n = 0, D = 0, p = $("#" + e), s = 0, B = 0, w = g + d;
                if (C && C.entry_list) {
                    var A, v, o = '<table data-role="table" data-mode="reflow" data-link="zoom" id="KreportTable" class="ui-responsive table-stroke reportTable" style="width:100%;">', z = C.entry_list.header, h = C.entry_list.values.records;
                    n = parseInt(C.entry_list.values.count, 10);
                    $("#KReportsNameH1").html(C.entry_list.name);
                    showFavoriteStatus("KReports", c, C.entry_list.name);
                    if (b.LastViewed) {
                        PushViewed(b.name, b.CurrentId, C.entry_list.name)
                    }
                    $("#" + e + "T").html(n === 0 ? "-" : ((g + 1).toString() + "-" + (w > n ? n : w).toString() + "/&shy;" + n.toString()));
                    o += "<thead><tr>";
                    for (A = 0; A < z.length; A++) {
                        if (!z[A].hidden) {
                            if (typeof z[A].width === "number") {
                                z[A].width = z[A].width.toString()
                            }
                            o += "<th class='reportCell' style='background-color: #c5c5c5;' align=" + z[A].align + " width='" + z[A].width + "'>" + z[A].text.substring(1, z[A].text.length - 1) + "</th>";
                            z[A].renderer = z[A].renderer.substring(1, z[A].renderer.length - 1);
                            D += parseInt(z[A].width, 10)
                        }
                    }
                    o += "</tr></thead><tbody>";
                    for (A = 0; A < h.length; A++) {
                        var m = h[A];
                        o += "<tr>";
                        for (v = 0; v < z.length; v++) {
                            var l = z[v], E, u = l.dataIndex.substring(1, l.dataIndex.length - 1), q = l.renderer;
                            if (!l.hidden) {
                                E = m[u];
                                o += "<td class='reportCell' align=" + l.align + " width='" + l.width + "'>";
                                if (E !== "" && E !== null) {
                                    switch (l.renderer) {
                                        case"kdateRenderer":
                                            E = jQuery.mobiscroll.formatDate(date_format, fromDBDate(E)) + "&shy;";
                                            break;
                                        case"kdatetimeRenderer":
                                            E = jQuery.mobiscroll.formatDate(datetime_format, fromDBDateTime(E, false)) + "&shy;";
                                            break;
                                        case"kcurrencyRenderer":
                                            var r = default_currency_symbol;
                                            E = parseFloat(E).formatCurrency(currency_digits, decimal_separator, number_separator, default_currency_symbol);
                                            break;
                                        case"knumberRenderer":
                                            E = parseFloat(E).formatNumber(2, decimal_separator, number_separator);
                                            break;
                                        default:
                                            E += "&shy;";
                                            break
                                    }
                                    o += E
                                }
                                o += "</td>"
                            }
                        }
                        o += "</tr>"
                    }
                    o += "</tbody></table>";
                    p.append('<li data-theme="d" style="padding: 0 !important">' + o + "</li>");
                    if ($("#KreportTable").width() > $("#KReportsNameH1").width()) {
                        $("#KreportTable").table().trigger("create")
                    }
                    B = g - 20;
                    enableButton(e + "L", B >= 0);
                    if (B < 0) {
                        B = 0
                    }
                    s = g + 20;
                    enableButton(e + "R", s < n);
                    if (s > n) {
                        s = g
                    }
                } else {
                    $("#" + e + "T").empty()
                }
                p.listview("refresh");
                $("#" + e + "L").unbind("click");
                $("#" + e + "R").unbind("click");
                $("#" + e + "L").click({offset: B}, function(F)
                {
                    a(F.data.offset)
                });
                $("#" + e + "R").click({offset: s}, function(F)
                {
                    a(F.data.offset)
                })
            })
        }

        a(0)
    }
};
Beans.asol_Reports = new SugarBean("asol_Reports", "asol_reports", "basic");
Beans.asol_Reports.fullPage = true;
QCRM.asol_ReportsSetup = function()
{
    var a, b = "", c = [];
    Beans.asol_Reports.Favorites = true;
    Beans.asol_Reports.LimitWhere = "(report_charts_engine='nvd3' OR report_charts = 'Tabl')";
    if (!UserIsAdmin) {
        b = "report_scope = 'public' OR @table.assigned_user_id = '" + CurrentUserId + "' OR @table.created_by = '" + CurrentUserId + "'";
        if (CurrentUserRoleIds != "" && CurrentUserRoleIds.length > 0) {
            for (a = 0; a < CurrentUserRoleIds.length; a++) {
                c.push("report_scope LIKE '%" + CurrentUserRoleIds[a] + "%'")
            }
            b += " OR " + c.join(" OR ")
        }
        Beans.asol_Reports.LimitWhere = "(" + Beans.asol_Reports.LimitWhere + " AND (" + b + "))"
    }
    Pref.SyncModules.asol_Reports = {preset: true, sync: "None", max: false};
    if (QCRM.OffLine || Q_API < "2.9") {
        return
    }
    $("#asol_ReportsDP").on("pagehide", function()
    {
        d3Reports.selectAll("svg").remove();
        nvReports.charts = {};
        nvReports.graphs = [];
        nvReports.logs = {};
        window.onresize = null;
        $("#asol_ReportsDetailsFtr").empty()
    });
    QCRM.SetModuleHook("asol_Reports", "init_view", function()
    {
        $("#asol_ReportsDetailsList").append("<li>" + getNavButtons("asol_ReportsDetailsList") + "</li>")
    });
    Beans.asol_Reports.acl.edit = false;
    Beans.asol_Reports.acl.del = false;
    window.SUGAR = {
        util: {
            doWhen: function(d, e)
            {
                e()
            }
        }
    };
    Beans.asol_Reports.ViewDetails = function()
    {
        var g = this, h = this.CurrentId, d = RowsPerPage;

        function e(n)
        {
            var m = "asol_ReportsDetailsList", l = {
                session: SugarSessionId,
                reportId: h,
                vardefFilters: true,
                sortField: "",
                sortDirection: "",
                sortIndex: "",
                pageNumber: n.toString(),
                isDashlet: false,
                dashletId: "",
                getLibraries: false,
                overrideEntries: "20",
                externalFilters: "",
                currentUserId: CurrentUserId,
                currentLanguage: getSugarLanguage(sugar_languages, default_language),
                contextDomainId: ""
            };
            $("#" + m + " li:gt(0)").remove();
            enableButton(m + "L", n > 0);
            QCRM.CustomRest("custom/QuickCRM/restasol.php", "post", "text", {
                method: "executeAlineaSolReport",
                input_type: "JSON",
                response_type: "TEXT",
                rest_data: JSON.stringify(l)
            }, function(z)
            {
                if (!z) {
                    $.mobile.loading("hide");
                    return
                }
                var w = 0, q = z.indexOf('"asolReportsHeadersRow"') >= 0, v = z.indexOf('"pagination"') >= 0, C = "&nbsp;", p = $("#" + m), A = 0, u = 0, B = n + d, o, r = z.replace(/(\r\n|\n|\r)/gm, "").replace('id="resultTable"', 'id="resultTable" data-link="zoom" data-role="table"').replace(/.+id..internalHtmlReport/, '<div id="internalHtmlReport');
                if (!mobile_app) {
                    r = r.replace(/modules\/asol_Reports/g, "../modules/asol_Reports")
                }
                jQuery.blockUI = true;
                if (v) {
                    p.show()
                } else {
                    p.hide()
                }
                $("#asol_ReportsDetailsFtr").hide();
                try {
                    $("#asol_ReportsDetailsFtr").html(r)
                } catch (s) {
                    $("#asol_ReportsDetailsFtr").html("This report type is not supported");
                    return
                }
                o = $("#moduleTitle h2").html();
                $("#asol_ReportsNameH1").html(o);
                $(".pageNumbers").each(function(E, D)
                {
                    C = $(this).html()
                });
                $("#" + m + "T").html(C);
                showFavoriteStatus("asol_Reports", h, o);
                if (g.LastViewed) {
                    PushViewed(g.name, g.CurrentId, o)
                }
                $("#asol_ReportsDetailsFtr button").remove();
                $("#resultDiv_collapseImg").remove();
                $("#resultDivWrapper h4").remove();
                $("#resultDivWrapper .listViewThLinkS1").prop("onclick", null).off("click");
                $("#asolReportExportDiv").remove();
                $("#display_form").remove();
                $("#export_form").remove();
                if (q) {
                    $("#resultTable").addClass("ui-responsive table-stroke reportTable")
                }
                $("#resultTable img").remove();
                $("#moduleTitle").remove();
                $(".asolChartContainer").css("width", "100%");
                $(".asolChartContainer").css("height", "auto");
                $(".asolChartContainer").css("min-height", "450px");
                $("#asol_ReportsDetailsFtr svg").css("width", "100%");
                $("#asol_ReportsDetailsFtr svg").css("height", "auto");
                $("#asol_ReportsDetailsFtr svg").css("min-height", "450px");
                if (q && $("#asol_ReportsTable").width() > $("#asol_ReportsNameH1").width()) {
                    $("#asol_ReportsTable").table().trigger("create")
                }
                $("#asol_ReportsDetailsFtr").show();
                $.mobile.loading("hide");
                w = $("#reportTable tr").length;
                if (w === 1 && n > 0) {
                    e(n - 1);
                    return
                }
                $("#asol_ReportsDetailsFtr .pagination").remove();
                u = n - 1;
                enableButton(m + "L", u >= 0);
                if (u < 0) {
                    u = 0
                }
                A = n + 1;
                enableButton(m + "R", v);
                $("#" + m + "L").unbind("click");
                $("#" + m + "R").unbind("click");
                $("#" + m + "L").click({offset: u}, function(D)
                {
                    e(D.data.offset)
                });
                $("#" + m + "R").click({offset: A}, function(D)
                {
                    e(D.data.offset)
                })
            })
        }

        $.mobile.loading("show");
        e(0)
    }
};
QCRM.SugarFeedSetup = function()
{
    var a = Beans.SugarFeed;
    a.acl.edit = false;
    a.acl.del = false;
    Pref.SyncModules.SugarFeed = {preset: true, sync: "None", max: false};
    QCRM.AddToListFields("SugarFeed", ["related_module", "related_id", "created_by_name", "date_entered"]);
    a.DisplayTitle = function(g)
    {
        var e = /{SugarFeed(.*?)}/g, c = /\[(.*?)\]/g, h, l, b, d = g.name.value, p = sugar_app_list_strings.moduleListSingular[g.related_module.value] || g.related_module.value;
        l = d.match(e);
        b = d.match(c);
        for (h in l) {
            var m = l[h].substring(11, l[h].length - 1);
            d = d.replace(l[h], sugar_mod_strings.SugarFeed[m].replace("{0}", p))
        }
        for (h in b) {
            var o = b[h].substring(1, b[h].length - 1).split(":"), n = (Beans[o[0]] && Beans[o[0]].Enabled()) ? ('<a class="QCRMActLinks" data-link="bean" data-module="' + o[0] + '" data-identity="' + o[1] + '">' + o[2] + "</a>") : o[2];
            d = d.replace(b[h], n)
        }
        d = d + "<br>" + jQuery.mobiscroll.formatDate(datetime_format, fromDBDateTime(g.date_entered.value));
        return '<span style="white-space:normal">' + d.replace("{this.CREATED_BY}", g.created_by_name.value).replace(/&lt;/g, "<").replace(/&gt;/g, ">") + "</span>"
    };
    a.DisplaySubpanelElt = a.DisplayTitle
};
function insertLineItems(h, m)
{
    var c = "product_";
    var e = 0;
    var a = "lineItems";
    var b = h.group_id;
    if (typeof QCRM.AOS_group_ids[b] === "undefined") {
        a = insertGroup();
        QCRM.AOS_group_ids[b] = a;
        for (var d in m) {
            if (document.getElementById("group" + a + d) !== null) {
                document.getElementById("group" + a + d).value = m[d]
            }
        }
    } else {
        a = QCRM.AOS_group_ids[b]
    }
    if (h.product_id != "0" && h.product_id !== "") {
        e = insertProductLine("product_group" + a, a);
        c = "product_"
    } else {
        e = insertServiceLine("service_group" + a, a);
        c = "service_"
    }
    for (var l in h) {
        if (document.getElementById(c + l + e) !== null) {
            if (h[l] !== "" && isNumeric(h[l]) && l != "vat" && l != "group_number" && l != "product_id" && l != "name" && l != "part_number") {
                document.getElementById(c + l + e).value = format2Number(h[l])
            } else {
                document.getElementById(c + l + e).value = h[l]
            }
        }
    }
    calculateLine(e, c)
}
function insertProductLine(h, l)
{
    if (!QCRM.AOS_groups) {
        h = "product_group0"
    }
    if (document.getElementById(h + "_head") !== null) {
        document.getElementById(h + "_head").style.display = ""
    }
    var r = document.getElementById("vathidden").value;
    var z = document.getElementById("discounthidden").value;
    colWidth = ["7%", "35%", "17%", "10%", "7%", "7%", "8%", "9%"];
    var A = document.getElementById(h + "_body");
    var w = A.insertRow(-1);
    w.id = "product_line" + QCRM.AOS_prodln;
    w.className = "itemLine";
    var v = w.insertCell(0);
    v.width = colWidth[0];
    v.className = "Pcol0";
    v.innerHTML = "<input type='text' name='product_product_qty[" + QCRM.AOS_prodln + "]' id='product_product_qty" + QCRM.AOS_prodln + "' size='5' value='' title='' onblur='Quantity_format2Number(" + QCRM.AOS_prodln + ");calculateLine(" + QCRM.AOS_prodln + ',"product_");\'>';
    var s = w.insertCell(1);
    s.width = colWidth[1];
    s.className = "Pcol1";
    s.innerHTML = "<input autocomplete='off' type='text' data-clear-btn='true' name='product_name[" + QCRM.AOS_prodln + "]' id='product_name" + QCRM.AOS_prodln + "' maxlength='50' title='' value=''><input type='hidden' name='product_product_id[" + QCRM.AOS_prodln + "]' id='product_product_id" + QCRM.AOS_prodln + "' size='20' maxlength='50' value=''><ul style='display:none;' id='product_name" + QCRM.AOS_prodln + "L' data-theme='c' data-inset='true' data-role='listview'/>";
    s.innerHTML += "<textarea placeholder='" + sugarLabel(QCRM.CurrentModule, "LBL_PRODUCT_DESCRIPTION") + "' name='product_item_description[" + QCRM.AOS_prodln + "]' id='product_item_description" + QCRM.AOS_prodln + "' rows='2' cols='23'></textarea>";
    var u = w.insertCell(2);
    u.width = colWidth[2];
    u.className = "Pcol2";
    u.innerHTML = "<input autocomplete='off' type='text' name='product_part_number[" + QCRM.AOS_prodln + "]' id='product_part_number" + QCRM.AOS_prodln + "' maxlength='50' title='' value='' readonly='readonly'>";
    u.innerHTML += "<textarea placeholder='" + sugarLabel(QCRM.CurrentModule, "LBL_PRODUCT_NOTE") + "' name='product_description[" + QCRM.AOS_prodln + "]' id='product_description" + QCRM.AOS_prodln + "' rows='2' cols='23'></textarea>";
    var q = w.insertCell(3);
    q.width = colWidth[3];
    q.className = "Pcol3";
    q.innerHTML = "<input class='itemNumber' type='text' name='product_product_list_price[" + QCRM.AOS_prodln + "]' id='product_product_list_price" + QCRM.AOS_prodln + "' size='11' maxlength='50' value='' title='' onblur='calculateLine(" + QCRM.AOS_prodln + ",\"product_\");'><input type='hidden' name='product_product_cost_price[" + QCRM.AOS_prodln + "]' id='product_product_cost_price" + QCRM.AOS_prodln + "' value=''  />";
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("product_product_list_price" + QCRM.AOS_prodln);
        currencyFields.push("product_product_cost_price" + QCRM.AOS_prodln)
    }
    var p = w.insertCell(4);
    p.width = colWidth[4];
    p.className = "Pcol4";
    p.innerHTML = "<input type='text' class='itemNumber' name='product_product_discount[" + QCRM.AOS_prodln + "]' id='product_product_discount" + QCRM.AOS_prodln + "' size='12' maxlength='50' value='' title='' onblur='calculateLine(" + QCRM.AOS_prodln + ",\"product_\");' onblur='calculateLine(" + QCRM.AOS_prodln + ",\"product_\");'><input type='hidden' name='product_product_discount_amount[" + QCRM.AOS_prodln + "]' id='product_product_discount_amount" + QCRM.AOS_prodln + "' value=''  />";
    p.innerHTML += "<select data-mini='true' name='product_discount[" + QCRM.AOS_prodln + "]' id='product_discount" + QCRM.AOS_prodln + "' onchange='calculateLine(" + QCRM.AOS_prodln + ',"product_");\'>' + z + "</select>";
    var o = w.insertCell(5);
    o.width = colWidth[5];
    o.className = "Pcol5";
    o.innerHTML = "<input type='text' class='itemNumber' name='product_product_unit_price[" + QCRM.AOS_prodln + "]' id='product_product_unit_price" + QCRM.AOS_prodln + "' size='11' maxlength='50' value='' title='' readonly='readonly' onblur='calculateLine(" + QCRM.AOS_prodln + ",\"product_\");' onblur='calculateLine(" + QCRM.AOS_prodln + ',"product_");\'>';
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("product_product_unit_price" + QCRM.AOS_prodln)
    }
    var n = w.insertCell(6);
    n.width = colWidth[6];
    n.className = "Pcol6";
    n.innerHTML = "<input type='text' class='itemNumber' name='product_vat_amt[" + QCRM.AOS_prodln + "]' id='product_vat_amt" + QCRM.AOS_prodln + "' size='11' maxlength='250' value='' title='' readonly='readonly'>";
    n.innerHTML += "<select data-mini='true' name='product_vat[" + QCRM.AOS_prodln + "]' id='product_vat" + QCRM.AOS_prodln + "' onchange='calculateLine(" + QCRM.AOS_prodln + ',"product_");\'>' + r + "</select>";
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("product_vat_amt" + QCRM.AOS_prodln)
    }
    var m = w.insertCell(7);
    m.width = colWidth[7];
    m.className = "Pcol7";
    m.innerHTML = "<input type='text' class='itemNumber' name='product_product_total_price[" + QCRM.AOS_prodln + "]' id='product_product_total_price" + QCRM.AOS_prodln + "' size='11' maxlength='50' value='' title='' readonly='readonly'><input type='hidden' name='product_group_number[" + QCRM.AOS_prodln + "]' id='product_group_number" + QCRM.AOS_prodln + "' value='" + l + "'>";
    m.innerHTML += "<button type='button' data-icon='delete' data-mini='true' id='product_delete_line" + QCRM.AOS_prodln + "' data-theme='b' data-iconpos='notext' class='button'  onclick='markLineDeleted(" + QCRM.AOS_prodln + ',"product_")\'/>';
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("product_product_total_price" + QCRM.AOS_prodln)
    }
    m.innerHTML += "<input type='hidden' name='product_currency[" + QCRM.AOS_prodln + "]' id='product_currency" + QCRM.AOS_prodln + "' value=''><input type='hidden' name='product_deleted[" + QCRM.AOS_prodln + "]' id='product_deleted" + QCRM.AOS_prodln + "' value='0'><input type='hidden' name='product_id[" + QCRM.AOS_prodln + "]' id='product_id" + QCRM.AOS_prodln + "' value=''>";
    m.innerHTML += "<input type='hidden' id='product_new_with_id" + QCRM.AOS_prodln + "' value='0'>";
    $("#product_name" + QCRM.AOS_prodln + "L").listview();
    $("#product_name" + QCRM.AOS_prodln).unbind("input");
    $("#product_name" + QCRM.AOS_prodln).on("input", (function(a)
    {
        return function(b)
        {
            pickProduct("product_name" + a, "product_product_id" + a, [{
                name: "product_product_list_price" + a,
                copy: "price"
            }, {name: "product_part_number" + a, copy: "part_number"}], function(c)
            {
                formatListPrice(a)
            })
        }
    })(QCRM.AOS_prodln));
    $("#" + h).table().trigger("create");
    $("#" + h + "_body .ui-table-cell-label").remove();
    $("#" + h).table("refresh");
    QCRM.AOS_prodln++;
    return QCRM.AOS_prodln - 1
}
function formatListPrice(d)
{
    if (typeof currencyFields !== "undefined") {
        var c = document.getElementById("product_currency" + d).value;
        c = c ? c : -99;
        var b = get_rate(c);
        var e = ConvertToDollar(document.getElementById("product_product_list_price" + d).value, b);
        document.getElementById("product_product_list_price" + d).value = format2Number(ConvertFromDollar(e, lastRate));
        var a = ConvertToDollar(document.getElementById("product_product_cost_price" + d).value, b);
        document.getElementById("product_product_cost_price" + d).value = format2Number(ConvertFromDollar(a, lastRate))
    } else {
        document.getElementById("product_product_list_price" + d).value = format2Number(document.getElementById("product_product_list_price" + d).value);
        document.getElementById("product_product_cost_price" + d).value = format2Number(document.getElementById("product_product_cost_price" + d).value)
    }
    calculateLine(d, "product_")
}
function insertServiceLine(g, l)
{
    if (!QCRM.AOS_groups) {
        g = "service_group0"
    }
    if (document.getElementById(g + "_head") !== null) {
        document.getElementById(g + "_head").style.display = ""
    }
    var o = document.getElementById("vathidden").value;
    var s = document.getElementById("discounthidden").value;
    colWidth = ["45%", "11%", "11%", "11%", "11%", "11%"];
    var u = document.getElementById(g + "_body");
    var r = u.insertRow(-1);
    r.id = "service_line" + QCRM.AOS_servln;
    r.className = "itemLine";
    var q = r.insertCell(0);
    q.width = colWidth[0];
    q.className = "Scol0";
    q.innerHTML = "<textarea name='service_name[" + QCRM.AOS_servln + "]' id='service_name" + QCRM.AOS_servln + "' size='16' cols='64' title='' tabindex='116'></textarea><input type='hidden' name='service_product_id[" + QCRM.AOS_servln + "]' id='service_product_id" + QCRM.AOS_servln + "' size='20' maxlength='50' value='0'>";
    var h = r.insertCell(1);
    h.width = colWidth[1];
    h.className = "Scol1";
    h.innerHTML = "<input type='text' class='itemNumber' name='service_product_list_price[" + QCRM.AOS_servln + "]' id='service_product_list_price" + QCRM.AOS_servln + "' size='11' maxlength='50' value='' title=''   onblur='calculateLine(" + QCRM.AOS_servln + ',"service_");\'>';
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("service_product_list_price" + QCRM.AOS_servln)
    }
    var d = r.insertCell(2);
    d.width = colWidth[2];
    d.className = "Scol2";
    d.innerHTML = "<input type='text' class='itemNumber' name='service_product_discount[" + QCRM.AOS_servln + "]' id='service_product_discount" + QCRM.AOS_servln + "' size='12' maxlength='50' value='' title='' onblur='calculateLine(" + QCRM.AOS_servln + ",\"service_\");' onblur='calculateLine(" + QCRM.AOS_servln + ",\"service_\");'><input type='hidden' name='service_product_discount_amount[" + QCRM.AOS_servln + "]' id='service_product_discount_amount" + QCRM.AOS_servln + "' value=''  />";
    d.innerHTML += "<select data-mini='true' name='service_discount[" + QCRM.AOS_servln + "]' id='service_discount" + QCRM.AOS_servln + "' onchange='calculateLine(" + QCRM.AOS_servln + ',"service_");\'>' + s + "</select>";
    var p = r.insertCell(3);
    p.width = colWidth[3];
    p.className = "Scol3";
    p.innerHTML = "<input type='text' class='itemNumber' name='service_product_unit_price[" + QCRM.AOS_servln + "]' id='service_product_unit_price" + QCRM.AOS_servln + "' size='11' maxlength='50' value='' title=''   onblur='calculateLine(" + QCRM.AOS_servln + ',"service_");\'>';
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("service_product_unit_price" + QCRM.AOS_servln)
    }
    var n = r.insertCell(4);
    n.width = colWidth[4];
    n.className = "Scol4";
    n.innerHTML = "<input type='text' class='itemNumber' name='service_vat_amt[" + QCRM.AOS_servln + "]' id='service_vat_amt" + QCRM.AOS_servln + "' size='11' maxlength='250' value='' title='' readonly='readonly'>";
    n.innerHTML += "<select data-mini='true' name='service_vat[" + QCRM.AOS_servln + "]' id='service_vat" + QCRM.AOS_servln + "' onchange='calculateLine(" + QCRM.AOS_servln + ',"service_");\'>' + o + "</select>";
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("service_vat_amt" + QCRM.AOS_servln)
    }
    var m = r.insertCell(5);
    m.width = colWidth[5];
    m.className = "Scol5";
    m.innerHTML = "<input type='text' class='itemNumber' name='service_product_total_price[" + QCRM.AOS_servln + "]' id='service_product_total_price" + QCRM.AOS_servln + "' size='11' maxlength='50' value='' title='' readonly='readonly'><input type='hidden' name='service_group_number[" + QCRM.AOS_servln + "]' id='service_group_number" + QCRM.AOS_servln + "' value='" + l + "'>";
    m.innerHTML += "<input type='hidden' name='service_deleted[" + QCRM.AOS_servln + "]' id='service_deleted" + QCRM.AOS_servln + "' value='0'><input type='hidden' name='service_id[" + QCRM.AOS_servln + "]' id='service_id" + QCRM.AOS_servln + "' value=''>";
    m.innerHTML += "<input type='hidden' id='service_new_with_id" + QCRM.AOS_prodln + "' value='0'>";
    m.innerHTML += "<button type='button' data-icon='delete' data-mini='true' id='service_delete_line" + QCRM.AOS_servln + "' data-theme='b' data-iconpos='notext' class='button' onclick='markLineDeleted(" + QCRM.AOS_servln + ',"service_")\'/>';
    if (typeof currencyFields !== "undefined") {
        currencyFields.push("service_product_total_price" + QCRM.AOS_servln)
    }
    $("#" + g).table().trigger("create");
    $("#" + g + "_body .ui-table-cell-label").remove();
    $("#" + g).table("refresh");
    QCRM.AOS_servln++;
    return QCRM.AOS_servln - 1
}
function insertProductHeader(l)
{
    var h = document.createElement("thead");
    h.id = l + "_head";
    h.style.display = "none";
    document.getElementById(l).appendChild(h);
    var w = document.createElement("tbody");
    w.id = l + "_body";
    document.getElementById(l).appendChild(w);
    var v = h.insertRow(-1);
    v.id = "product_head";
    v.className = "itemHeader";
    var u = document.createElement("th");
    u.style.color = "rgb(68,68,68)";
    u.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_PRODUCT_QUANITY");
    v.appendChild(u);
    var r = document.createElement("th");
    r.style.color = "rgb(68,68,68)";
    r.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_PRODUCT_NAME");
    v.appendChild(r);
    var s = document.createElement("th");
    s.style.color = "rgb(68,68,68)";
    s.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_PART_NUMBER");
    v.appendChild(s);
    var q = document.createElement("th");
    q.style.color = "rgb(68,68,68)";
    q.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_LIST_PRICE");
    v.appendChild(q);
    var p = document.createElement("th");
    p.style.color = "rgb(68,68,68)";
    p.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_DISCOUNT_AMT");
    v.appendChild(p);
    var o = document.createElement("th");
    o.style.color = "rgb(68,68,68)";
    o.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_UNIT_PRICE");
    v.appendChild(o);
    var n = document.createElement("th");
    n.style.color = "rgb(68,68,68)";
    n.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_VAT_AMT");
    v.appendChild(n);
    var m = document.createElement("th");
    m.style.color = "rgb(68,68,68)";
    m.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_TOTAL_PRICE");
    v.appendChild(m)
}
function insertServiceHeader(h)
{
    var g = document.createElement("thead");
    g.id = h + "_head";
    g.style.display = "none";
    document.getElementById(h).appendChild(g);
    var s = document.createElement("tbody");
    s.id = h + "_body";
    document.getElementById(h).appendChild(s);
    var r = g.insertRow(-1);
    r.id = "service_head";
    r.className = "itemHeader";
    var q = document.createElement("th");
    q.style.color = "rgb(68,68,68)";
    q.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_SERVICE_NAME");
    r.appendChild(q);
    var p = document.createElement("th");
    p.style.color = "rgb(68,68,68)";
    p.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_SERVICE_LIST_PRICE");
    r.appendChild(p);
    var o = document.createElement("th");
    o.style.color = "rgb(68,68,68)";
    o.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_SERVICE_DISCOUNT");
    r.appendChild(o);
    var n = document.createElement("th");
    n.style.color = "rgb(68,68,68)";
    n.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_SERVICE_PRICE");
    r.appendChild(n);
    var m = document.createElement("th");
    m.style.color = "rgb(68,68,68)";
    m.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_VAT_AMT");
    r.appendChild(m);
    var l = document.createElement("th");
    l.style.color = "rgb(68,68,68)";
    l.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_TOTAL_PRICE");
    r.appendChild(l)
}
function insertGroup()
{
    if (!QCRM.AOS_groups && QCRM.AOS_groupn > 0) {
        return
    }
    var u = document.createElement("tr");
    u.id = "group_body" + QCRM.AOS_groupn;
    document.getElementById("lineItems").appendChild(u);
    var I = u.insertCell(0);
    I.colSpan = "100";
    var G = document.createElement("table");
    G.id = "group" + QCRM.AOS_groupn;
    if (QCRM.AOS_groups) {
        G.style.border = "1px grey solid";
        G.style.borderRadius = "4px"
    }
    G.style.whiteSpace = "normal";
    I.appendChild(G);
    tableheader = document.createElement("thead");
    G.appendChild(tableheader);
    var D = tableheader.insertRow(-1);
    if (QCRM.AOS_groups) {
        var c = D.insertCell(0);
        c.scope = "row";
        c.colSpan = "8";
        c.innerHTML = sugarLabel(QCRM.CurrentModule, "LBL_GROUP_NAME") + ":&nbsp;&nbsp;<input name='group_name[]' id='" + G.id + "name' size='30' maxlength='255'  title='' tabindex='120' type='text'><input type='hidden' name='group_id[]' id='" + G.id + "id' value=''><input type='hidden' name='group_group_number[]' id='" + G.id + "group_number' value='" + QCRM.AOS_groupn + "'>";
        var F = D.insertCell(1);
        F.scope = "row";
        F.innerHTML = "<span title='" + sugarLabel(QCRM.CurrentModule, "LBL_DELETE_GROUP") + "' style='float: right;'><a style='cursor: pointer;' id='deleteGroup' onclick='markGroupDeleted(" + QCRM.AOS_groupn + ")'><img src='themes/default/images/id-ff-clear.png' alt='X'></a></span><input type='hidden' name='group_deleted[]' id='" + G.id + "deleted' value='0'>"
    }
    var E = document.createElement("thead");
    G.appendChild(E);
    var H = E.insertRow(-1);
    var l = H.insertCell(0);
    l.colSpan = "100";
    var p = document.createElement("table");
    p.id = "product_group" + QCRM.AOS_groupn;
    p.width = "100%";
    p.className = "ui-responsive table-stroke";
    p.setAttribute("data-mode", "reflow");
    p.setAttribute("data-role", "table");
    l.appendChild(p);
    insertProductHeader(p.id);
    var o = document.createElement("thead");
    G.appendChild(o);
    var q = o.insertRow(-1);
    var m = q.insertCell(0);
    m.colSpan = "100";
    var b = document.createElement("table");
    b.id = "service_group" + QCRM.AOS_groupn;
    b.width = "100%";
    b.className = "ui-responsive table-stroke";
    b.setAttribute("data-mode", "reflow");
    b.setAttribute("data-role", "table");
    m.appendChild(b);
    insertServiceHeader(b.id);
    var s = document.createElement("tfoot");
    G.appendChild(s);
    var z = s.insertRow(-1);
    var r = z.insertCell(0);
    r.scope = "row";
    r.colSpan = "20";
    r.innerHTML = "<input type='button' class='button' value='" + sugarLabel(QCRM.CurrentModule, "LBL_ADD_PRODUCT_LINE") + "' id='" + p.id + "addProductLine' onclick='insertProductLine(\"" + p.id + '","' + QCRM.AOS_groupn + "\")' />";
    r.innerHTML += " <input type='button' class='button' value='" + sugarLabel(QCRM.CurrentModule, "LBL_ADD_SERVICE_LINE") + "' id='" + b.id + "addServiceLine' onclick='insertServiceLine(\"" + b.id + '","' + QCRM.AOS_groupn + "\")' />";
    if (QCRM.AOS_groups) {
        r.innerHTML += "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_TOTAL_AMT") + ":&nbsp;&nbsp;<input name='group_total_amt[]' id='" + G.id + "total_amt' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
        var n = s.insertRow(-1);
        var C = n.insertCell(0);
        C.scope = "row";
        C.colSpan = "20";
        C.innerHTML = "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_DISCOUNT_AMOUNT") + ":&nbsp;&nbsp;<input name='group_discount_amount[]' id='" + G.id + "discount_amount' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
        var h = s.insertRow(-1);
        var B = h.insertCell(0);
        B.scope = "row";
        B.colSpan = "20";
        B.innerHTML = "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_SUBTOTAL_AMOUNT") + ":&nbsp;&nbsp;<input name='group_subtotal_amount[]' id='" + G.id + "subtotal_amount' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
        var g = s.insertRow(-1);
        var A = g.insertCell(0);
        A.scope = "row";
        A.colSpan = "20";
        A.innerHTML = "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_TAX_AMOUNT") + ":&nbsp;&nbsp;<input name='group_tax_amount[]' id='" + G.id + "tax_amount' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
        if (document.getElementById("subtotal_tax_amount") !== null) {
            var e = s.insertRow(-1);
            var w = e.insertCell(0);
            w.scope = "row";
            w.colSpan = "20";
            w.innerHTML = "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_SUBTOTAL_TAX_AMOUNT") + ":&nbsp;&nbsp;<input name='group_subtotal_tax_amount[]' id='" + G.id + "subtotal_tax_amount' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
            if (typeof currencyFields !== "undefined") {
                currencyFields.push("" + G.id + "subtotal_tax_amount")
            }
        }
        var d = s.insertRow(-1);
        var v = d.insertCell(0);
        v.scope = "row";
        v.colSpan = "20";
        v.innerHTML = "<span style='float: right;'>" + sugarLabel(QCRM.CurrentModule, "LBL_GROUP_TOTAL") + ":&nbsp;&nbsp;<input name='group_total_amount[]' id='" + G.id + "total_amount' size='21' maxlength='26' value='' title='' tabindex='120' type='text' readonly></span>";
        if (typeof currencyFields !== "undefined") {
            currencyFields.push("" + G.id + "total_amt");
            currencyFields.push("" + G.id + "discount_amount");
            currencyFields.push("" + G.id + "subtotal_amount");
            currencyFields.push("" + G.id + "tax_amount");
            currencyFields.push("" + G.id + "total_amount")
        }
    }
    QCRM.AOS_groupn++;
    return QCRM.AOS_groupn - 1
}
function markGroupDeleted(c)
{
    document.getElementById("group_body" + c).style.display = "none";
    document.getElementById("group" + c + "deleted").value = "1";
    var b = document.getElementById("group_body" + c).getElementsByTagName("tbody");
    for (x = 0; x < b.length; x++) {
        var a = b[x].getElementsByTagName("button");
        for (y = 0; y < a.length; y++) {
            if (a[y].id.indexOf("delete_line") != -1) {
                a[y].click()
            }
        }
    }
}
function markLineDeleted(c, b)
{
    document.getElementById(b + "line" + c).style.display = "none";
    document.getElementById(b + "deleted" + c).value = "1";
    document.getElementById(b + "delete_line" + c).onclick = "";
    var a = "group" + document.getElementById(b + "group_number" + c).value;
    calculateTotal(a);
    calculateTotal()
}
function calculateLine(h, n)
{
    var g = "product_list_price";
    if (document.getElementById(n + g + h) === null) {
        g = "product_unit_price"
    }
    if (document.getElementById(n + "name" + h).value === "" || document.getElementById(n + g + h).value === "") {
        return
    }
    if (n === "product_" && document.getElementById(n + "product_qty" + h) !== null && document.getElementById(n + "product_qty" + h).value === "") {
        document.getElementById(n + "product_qty" + h).value = 1
    }
    var l = unformat2Number(document.getElementById(n + "product_unit_price" + h).value);
    if (document.getElementById(n + "product_list_price" + h) !== null && document.getElementById(n + "product_discount" + h) !== null && document.getElementById(n + "discount" + h) !== null) {
        var a = get_value(n + "product_list_price" + h);
        var p = get_value(n + "product_discount" + h);
        var c = document.getElementById(n + "discount" + h).value;
        if (c == "Amount") {
            if (p > a) {
                document.getElementById(n + "product_discount" + h).value = a;
                p = a
            }
            l = a - p;
            document.getElementById(n + "product_unit_price" + h).value = format2Number(a - p)
        } else {
            if (c == "Percentage") {
                if (p > 100) {
                    document.getElementById(n + "product_discount" + h).value = 100;
                    p = 100
                }
                p = (p / 100) * a;
                l = a - p;
                document.getElementById(n + "product_unit_price" + h).value = format2Number(a - p)
            } else {
                document.getElementById(n + "product_unit_price" + h).value = document.getElementById(n + "product_list_price" + h).value;
                document.getElementById(n + "product_discount" + h).value = "";
                p = 0
            }
        }
        document.getElementById(n + "product_list_price" + h).value = format2Number(a);
        document.getElementById(n + "product_discount_amount" + h).value = format2Number(-p, 6)
    }
    var e = 1;
    if (document.getElementById(n + "product_qty" + h) !== null) {
        e = unformat2Number(document.getElementById(n + "product_qty" + h).value);
        Quantity_format2Number(h)
    }
    var m = unformatNumber(document.getElementById(n + "vat" + h).value, ",", "."), o = e * l, b = (o * m) / 100;
    if (QCRM.AOS_totaltax) {
        o = o + b
    }
    document.getElementById(n + "vat_amt" + h).value = format2Number(b);
    document.getElementById(n + "product_unit_price" + h).value = format2Number(l);
    document.getElementById(n + "product_total_price" + h).value = format2Number(o);
    var d = 0;
    if (QCRM.AOS_groups) {
        d = document.getElementById(n + "group_number" + h).value
    }
    d = "group" + d;
    calculateTotal(d);
    calculateTotal()
}
function calculateAllLines()
{
    var e = document.getElementById("lineItems").getElementsByTagName("tbody");
    var d = e.length;
    for (k = 0; k < d; k++) {
        var a = e[k].getElementsByTagName("input"), b = a[0].id.split("_")[0] + "_", c = a[0].id.slice(-1);
        calculateLine(c, b)
    }
}
function calculateTotal(A)
{
    if (typeof A === "undefined") {
        A = "lineItems"
    }
    var e = document.getElementById(A).getElementsByTagName("tr");
    if (A == "lineItems") {
        A = ""
    }
    var b = e.length, d = {}, a = 0, g = 0, o = 0, s = 0;
    for (i = 0; i < b; i++) {
        if ((e[i].id == "") || (A == "" && e[i].id.indexOf("group") !== -1)) {
            continue
        }
        var m = 1, v = null, r = 0, p = 0, l = 0, q = 0, n = e[i].getElementsByTagName("input");
        for (j = 0; j < n.length; j++) {
            if (n[j].id.indexOf("product_qty") != -1) {
                m = unformat2Number(n[j].value)
            }
            if (n[j].id.indexOf("product_list_price") != -1) {
                v = unformat2Number(n[j].value)
            }
            if (n[j].id.indexOf("product_unit_price") != -1) {
                r = unformat2Number(n[j].value)
            }
            if (n[j].id.indexOf("product_discount_amount") != -1) {
                l = unformat2Number(n[j].value)
            }
            if (n[j].id.indexOf("vat_amt") != -1) {
                q = unformat2Number(n[j].value)
            }
            if (n[j].id.indexOf("deleted") != -1) {
                p = n[j].value
            }
        }
        if (p != 1 && A !== "") {
            d[e[i].parentNode.id] = 1
        } else {
            if (A !== "" && d[e[i].parentNode.id] != 1) {
                d[e[i].parentNode.id] = 0
            }
        }
        if (m !== 0 && v !== null && p != 1) {
            a += v * m
        } else {
            if (m !== 0 && r !== 0 && p != 1) {
                a += r * m
            }
        }
        if (l !== 0 && p != 1) {
            o += l * m
        }
        if (q !== 0 && p != 1) {
            s += q
        }
    }
    for (var u in d) {
        if (d[u] != 1 && document.getElementById(u + "_head") !== null) {
            document.getElementById(u + "_head").style.display = "none"
        }
    }
    g = a + o;
    set_value(A + "total_amt", a);
    set_value(A + "subtotal_amount", g);
    set_value(A + "discount_amount", o);
    var c = get_value(A + "shipping_amount"), z = get_value(A + "shipping_tax"), w = c * (z / 100);
    set_value(A + "shipping_tax_amt", w);
    s += w;
    set_value(A + "tax_amount", s);
    set_value(A + "subtotal_tax_amount", g + s);
    set_value(A + "total_amount", g + s + c)
}
function set_value(b, a)
{
    if (document.getElementById(b) !== null) {
        document.getElementById(b).value = format2Number(a)
    }
}
function get_value(a)
{
    if (document.getElementById(a) !== null) {
        return unformat2Number(document.getElementById(a).value)
    }
    return 0
}
function Quantity_format2Number(a)
{
    var b = "";
    var c = unformat2Number(document.getElementById("product_product_qty" + a).value);
    if (c === null) {
        c = 1
    }
    if (c === 0) {
        b = "0"
    } else {
        b = format2Number(c);
        if (sig_digits) {
            b = b.replace(/0*$/, "").replace(decimal_separator, "~").replace(/~$/, "").replace("~", decimal_separator)
        }
    }
    document.getElementById("product_product_qty" + a).value = b
};