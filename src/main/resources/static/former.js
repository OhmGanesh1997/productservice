var formerTable;
//var searchText;
var files;

var fid=0;
//var localStorage;
$(document).ready(function() {

	
	//alert($('#searchtxt').val());
	$.fn.dataTableExt.oApi.fnReloadAjax = reloadAjaxDatatablesPlugin;
	//registerClearDataTabaleSearchFilter();
	initFormerTable();
	
	$('.modal').on("hidden.bs.modal", function(e) {
		if ($('.modal:visible').length) {
			$('body').addClass('modal-open');
		}
	});

	//registerFarmerDefaultTabShowEvt()
	$('#modal-farmer').on('show.bs.modal', function (event) {    
		  // Button that triggered the modal
		  // the modal
		  var modal = $(this);
		  modal.find('[href="#custom-tabs-one-home"]').tab('show');
		});
	//localStorage = new LocalStorage();
	
	/*$('#example').on('search.dt', function() {
	    var value = $('.dataTables_filter input').val();
	    console.log(value); // <-- the value
	});*/
	
	populateGroup();
	initNewFormer();
	registerSaveEvt();
	//validateFarmerForm();
	
	initDownloadFrmrReport();
	registerTeamChangeEvt();
	populateFrmTeamDropDown();
	registerBtnFarmerUpload();
	// initFormarSitePhotoUpload();
	$('#tpconfrm').on('submit', function(e) { //use on if jQuery 1.7+
		$('#tpconfrm').valid();

		/*if(($('#teamId').val() == 0) ) {
			custom_alert('Please select the Team', "Plantation - Alert", "#successInfo");
			e.preventDefault();
		} else if(($('#communityId').val() == 0) ) {
			custom_alert('Please select the Community', "Plantation - Alert", "#successInfo");
			e.preventDefault();
		} else { 
			return true;
		}*/
	});
	$('input[type=file]').on('change', prepareUpload);

	//alert($('#role').val());
	if($('#role').val() == 'staff'){
		formerTable.fnReloadAjax("former/getmappedfarmersbystaff?id="+$('#uid').val());
		//alert($('#userteamname').val());
		/*$('select#teamId').empty();
		$('select#teamId')
		.append(
				new Option($('#userteamid').val(),
						$('#userteamname').val()));*/
		
	} else {
		populateTeamList();
		registerTeamListChange();
		registerStaffNameChangeEvt();
		//fieldStaffClickEvt();
		registerSearchBtn();
		ndistrictdropdown(teamlist);
		districtdropdown();
		blockdropdown();
		panchayatdropdown();
		villagedropdown();
		districtchange();
		blockchange();
		panchayatchange();
		ndistrictdropdown();
		ndistrictchange();
		nblockchange();
		npanchayatchange();
	}
	
	

});

function ndistrictdropdown(teamlist){

	if(teamlist==0){
		$.get('district/getalldistricts', {
		}).done(
				function(json) {

					$('select#ndistrictid1').empty();

					$('select#ndistrictid1').append(
							new Option("All", "0"));

					for ( var i = 0; i < json.length; i++) {
						
							$('select#ndistrictid1')
							.append(
									new Option(json[i].district,
											json[i].id));
						
					}

				}).fail(function(jqxhr, textStatus, error) {
					$('select#ndistrictid1').val("");
				});

	}
	else{
		
	$.get('district/getmappeddistrictsbyteam', {
		teamid : $('select#teamlist').val()
	}).done(
			function(json) {

				$('select#ndistrictid1').empty();

				$('select#ndistrictid1').append(
						new Option("All", "0"));

				for ( var i = 0; i < json.length; i++) {
					
						$('select#ndistrictid1')
						.append(
								new Option(json[i].district,
										json[i].id));
					
				}

			}).fail(function(jqxhr, textStatus, error) {
				$('select#ndistrictid1').val("");
			});
	
	}

}


function ndistrictchange(){
	$("select#ndistrictid1").change(
			function(){
				$('select#npanchayatid1').empty();
				$('select#nvillageid1').empty();
				$.get('blockmaster/getblock',{
					id : $('select#ndistrictid1').val()
				}).done(function(json){
					$('select#nblockid1').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#nblockid1')
						.append(
								new Option(json[i].blockname,
										json[i].id));

					}
					sortFieldStaff();
					$('select#nblockid1')
					.prepend(
							new Option('All',0));	
					$('select#nblockid1').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}

function nblockchange(){
	
	$("select#nblockid1").change(
			function(){
				$('select#nvillageid1').empty();
				$.get('panchayat/getpanchayat',{
					id : $('select#nblockid1').val()
				}).done(function(json){
					$('select#npanchayatid1').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#npanchayatid1')
						.append(
								new Option(json[i].panchayat,
										json[i].id));

					}
				
					$('select#npanchayatid1')
					.prepend(
							new Option('All',0));	
					$('select#npanchayatid1').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}
function npanchayatchange(){
	
	$("select#npanchayatid1").change(
			function(){
				$.get('village/getvillages',{
					id : $('select#npanchayatid1').val()
				}).done(function(json){
					$('select#nvillageid1').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#nvillageid1')
						.append(
								new Option(json[i].village,
										json[i].id));
					}
					$('select#nvillageid1')
					.prepend(
							new Option('All',0));	
					$('select#nvillageid1').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}


function districtdropdown(){
	$.get('district/getalldistricts', {

	}).done(
			function(json) {


				$('select#ndistrictid').empty();

				$('select#ndistrictid').append(
						new Option("Select", "0"));

				for ( var i = 0; i < json.length; i++) {
					
						$('select#ndistrictid')
						.append(
								new Option(json[i].district,
										json[i].id));
					
				}

			}).fail(function(jqxhr, textStatus, error) {
				$('select#ndistrictid').val("");
			});

}

function blockdropdown(district,blockid){
	
	
				$.get('blockmaster/getblock',{
					id : district
				}).done(function(json){
					$('select#nblockid').empty();
//					$('select#nblockid').append(
//							new Option("All", "0"));

					for ( var i = 0; i < json.length; i++) {
						$('select#nblockid')
						.append(
								new Option(json[i].blockname,
										json[i].id));
					}
					if(blockid!=undefined)
						$('select#nblockid').val(blockid);
						else if(blockid==0)
						$('select#nblockid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});

}

function panchayatdropdown(block,panchayatid){
	
				$.get('panchayat/getpanchayat',{
					id : block
				}).done(function(json){
					$('select#npanchayatid').empty();
//					$('select#npanchayatid').append(
//							new Option("All", "0"));
					for ( var i = 0; i < json.length; i++) {
						$('select#npanchayatid')
						.append(
								new Option(json[i].panchayat,
										json[i].id));
					}
//					$('select#npanchayatid').val(0);
					if(panchayatid!=undefined)
						$('select#npanchayatid').val(panchayatid);
						else if(panchayatid==0)
						$('select#npanchayatid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});

}

function villagedropdown(panchayat,village){
	
	
				$.get('village/getvillages',{
					id : panchayat
				}).done(function(json){
					$('select#nvillageid').empty();
//					$('select#nvillageid').append(
//							new Option("All", "0"));
					for ( var i = 0; i < json.length; i++) {
						$('select#nvillageid')
						.append(
								new Option(json[i].village,
										json[i].id));
					}	
//					$('select#nvillageid').val(0);
					if(village!=undefined)
						$('select#nvillageid').val(village);
						else if(village==0)
						$('select#nvillageid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
}
function districtchange(){
	$("select#ndistrictid").change(
			function(){
				$('select#npanchayatid').empty();
				$('select#nvillageid').empty();
				$.get('blockmaster/getblock',{
					id : $('select#ndistrictid').val()
				}).done(function(json){
					$('select#nblockid').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#nblockid')
						.append(
								new Option(json[i].blockname,
										json[i].id));

					}
					sortFieldStaff();
					$('select#nblockid')
					.prepend(
							new Option('Select',0));	
					$('select#nblockid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}

function blockchange(){
	
	$("select#nblockid").change(
			function(){
				$('select#nvillageid').empty();
				$.get('panchayat/getpanchayat',{
					id : $('select#nblockid').val()
				}).done(function(json){
					$('select#npanchayatid').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#npanchayatid')
						.append(
								new Option(json[i].panchayat,
										json[i].id));

					}
				
					$('select#npanchayatid')
					.prepend(
							new Option('Select',0));	
					$('select#npanchayatid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}
function panchayatchange(){
	
	$("select#npanchayatid").change(
			function(){
				$.get('village/getvillages',{
					id : $('select#npanchayatid').val()
				}).done(function(json){
					$('select#nvillageid').empty();
					for ( var i = 0; i < json.length; i++) {
						$('select#nvillageid')
						.append(
								new Option(json[i].village,
										json[i].id));
					}
					$('select#nvillageid')
					.prepend(
							new Option('Select',0));	
					$('select#nvillageid').val(0);
					//closeLoadingIcon();
				}).fail(function(jqxhr,error,textstatus){
					//closeLoadingIcon();
				});
			});
}

function registerBtnFarmerUpload(){
	$('#btnfarmerupload').click(function(e){
		if($('input[name="farmerdata"]')[0].files[0].length == 0){
			alert('Choose file to upload');
			
		} else {
		
		var formData = new FormData();
        formData.append('file', $('input[name="farmerdata"]')[0].files[0]);
        //console.log("form data " + formData);
        $.ajax({
            url : 'former/uploadfarmerexcel',
            data : formData,
            processData : false,
            contentType : false,
            type : 'POST',
            success : function(data) {
                alert(data);
            },
            error : function(err) {
                alert(err);
            }
        });
		}
	});
}

function prepareUpload(event) {
	files = event.target.files;
}
function registerSearchBtn(){
	$('#btnSearch').click(function(e){
		formerTable.fnClearTable();
		//showLoadingIcon();
		
		console.log($("select#ndistrictid1").val(),$("select#nblockid1").val(),$("select#npanchayatid1").val(),$("select#nvillageid1").val());
		
		if($('select#fieldstaff').val()==0){
           
			console.log("hi");
			if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
					&& $("select#npanchayatid1").val()!=null && $("select#nvillageid1").val()!=null)
	         {
				
				formerTable.fnReloadAjax("former/getallformerbyids?did="
						+$("select#ndistrictid1").val()
						+"&bid="+$("select#nblockid1").val()
						+"&pid="+$("select#npanchayatid1").val()
						+"&vid="+$("select#nvillageid1").val());
				}		
			else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
					&& $("select#npanchayatid1").val()!=null)
	         {
				
				formerTable.fnReloadAjax("former/getallformerbyids?did="
						+$("select#ndistrictid1").val()
						+"&bid="+$("select#nblockid1").val()
						+"&pid="+$("select#npanchayatid1").val()
						+"&vid="+0);
				}	
			else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null)
	         {
				
				formerTable.fnReloadAjax("former/getallformerbyids?did="
						+$("select#ndistrictid1").val()
						+"&bid="+$("select#nblockid1").val()
						+"&pid="+0
						+"&vid="+0);
				}	
			else if($("select#ndistrictid1").val()!=0)
	         {
				
				formerTable.fnReloadAjax("former/getallformerbyids?did="+
						$("select#ndistrictid1").val()
						+"&bid="+0
						+"&pid="+0
						+"&vid="+0);
				}
			
			else if($("select#teamlist").val()!=0){
				
				formerTable.fnReloadAjax("former/getfarmerbyteamid?Id="
						+ $("select#teamlist").val());
				
			}
			else{
				
				formerTable.fnReloadAjax("former/getallformer");	
			}
			
		}
		else
			{
			
		if($('select#fieldstaff').val()!=null && $("select#ndistrictid1").val()==0){
			
			formerTable.fnReloadAjax("former/getmappedfarmersbystaff?id="
		+ $("select#fieldstaff").val());
			// search by field staff					
		} 
		
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null && $("select#nvillageid1").val()!=null)
         {
			
			console.log("village");
			
			formerTable.fnReloadAjax("former/getmappedfarmersbystaffs?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+$("select#npanchayatid1").val()
					+"&villageid="+$("select#nvillageid1").val());
			}		
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null)
         {
			
			console.log("panchayat");
			
			formerTable.fnReloadAjax("former/getmappedfarmersbystaffs?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+$("select#npanchayatid1").val()
					+"&villageid="+0);
			}	
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null)
         {
			
			console.log("block");
			
			formerTable.fnReloadAjax("former/getmappedfarmersbystaffs?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+0
					+"&villageid="+0);
			}	
		else if($("select#ndistrictid1").val()!=0)
         {
			
			console.log("district");
			
			formerTable.fnReloadAjax("former/getmappedfarmersbystaffs?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+0
					+"&panchayatid="+0
					+"&villageid="+0);
			}	
		else {
			//search team
			
			console.log("team");
			
			formerTable.fnReloadAjax("former/getfarmerbyteamid?Id="
					+ $("select#teamlist").val());
		}
		
			}
		
		//closeLoadingIcon();
	});
}

function registerTeamListChange(){
	$("select#teamlist").change(
			function(){
				//formerTable.fnClearTable();
				$('select#farmerlist').empty();
				/*formerTable.fnFilter('');
				if($("select#teamlist").val() == 0){
					formerTable.fnReloadAjax("former/getallformer");


				} else {
					formerTable.fnReloadAjax("former/getfarmerbyteamid?Id="
							+ $("select#teamlist").val());
				}*/
				//alert($('select#teamlist').val());
				$.get('user/getFieldStaffsbyteam',{
					teamid : $('select#teamlist').val()
				}).done(function(json){
					$('select#fieldstaff').empty();

					/**/

					for ( var i = 0; i < json.length; i++) {
						$('select#fieldstaff')
						.append(
								new Option(json[i].userId,
										json[i].id));

					}
					
					ndistrictdropdown($("select#teamlist").val());
					$('select#nblockid1').empty();
					$('select#npanchayatid1').empty();
					$('select#nvillageid1').empty();
					sortFieldStaff();
					$('select#fieldstaff')
					.prepend(
							new Option('All',0));					
					$("#fieldstaff").val(0);
				}).fail(function(jqxhr,error,textstatus){

				});
			});
}

/**/
function populateTeamList() {

	// alert('change event fired');
	$.get('team/getallteams', {

	}).done(function(json) {
		$('select#farmerlist').empty();

	

		for ( var i = 0; i < json.length; i++) {
			$('select#teamlist').append(new Option(json[i].teamName, json[i].id));
			// new Option(json[i].farmername,
			// json[i].farmername));
			// cropArray[i]= json[i].id + "," + json[i].cropName;
		}
		sortTeamList();
		if($('#role').val() == 'sadmin'){
			//alert("role" + $('#role').val());
			$('select#teamlist')
			.prepend(
					new Option('All',0));
			$('select#teamlist').val(0);
		}
		
		$("#teamlist").trigger("change");
	}).fail(function(jqxhr, textStatus, error) {
		// $('select#cropid1').val(0);
	});

}

function fieldStaffClickEvt(){
	$("select#farmerlist").change(
			function(){
				//showLoadingIcon();
				if($("select#farmerlist").val()==0){

					/*uploadstatusreporttable.fnReloadAjax("report/getuploadstatusreportforall?id="
							+ $("select#fieldstaff").val());*/
				} else {
					/*uploadstatusreporttable.fnReloadAjax("report/getuploadstatusreport?farmerid="
							+ $("select#farmerlist").val());*/				
				}
				////closeLoadingIcon();
			}
	);
}

function registerStaffNameChangeEvt(){
	$("select#fieldstaff").change(

			function() {
				
				ndistrictdropdown($("select#teamlist").val());
				$('select#nblockid1').empty();
				$('select#npanchayatid1').empty();
				$('select#nvillageid1').empty();

				if($('select#fieldstaff').val()>0){
					/*formerTable.fnFilter('');
					formerTable.fnReloadAjax("former/getmappedfarmersbystaff?id="
							+ $("select#fieldstaff").val());*/
					/*while(attachedFarmers.length > 0) {
					attachedFarmers.pop();
				}*/

					/*$.get('former/getmappedfarmersbystaff', {
					id : $('select#fieldstaff').val()
				}).done(
						function(json) {
							if(json.length == 0){
								alert("No farmers mapped");
							} else {
								formerTable.fnClearTable();
							}
							$('select#farmerlist').empty();

							for ( var i = 0; i < json.length; i++) {
								$('select#farmerlist')
								.append(
										new Option(json[i].name,
												json[i].id));
							}
							sortFarmers();

							$('select#farmerlist')
							.prepend(
									new Option('All',0));
							//sortFarmers();
							//showLoadingIcon();

							uploadstatusreporttable.fnReloadAjax("report/getuploadstatusreportforall?id="
									+ $("select#fieldstaff").val());

							////closeLoadingIcon();
							//sortField('farmerlist');
						}).fail(function(jqxhr, textStatus, error) {
							$('select#farmerlist').val("");
						});					*/			
				} else {
					/*formerTable.fnFilter('');
					formerTable.fnReloadAjax("former/getfarmerbyteamid?Id="
							+ $("select#teamlist").val());*/
				}
			});

}

function sortTeamList() {

	var options = $('select.teamso option');
	var arr = options.map(function(_, o) {
		return {
			t: $(o).text(),
			v: o.value
		};
	}).get();
	arr.sort(function(o1, o2) {
		var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	});
	options.each(function(i, o) {
		//console.log(i);
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});
}

function sortFieldStaff() {

	var options = $('select.fieldstaffso option');
	var arr = options.map(function(_, o) {
		return {
			t: $(o).text(),
			v: o.value
		};
	}).get();
	arr.sort(function(o1, o2) {
		var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	});
	options.each(function(i, o) {
		//console.log(i);
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});
}

function sortFarmers() {

	var options = $('select.farmerso option');
	var arr = options.map(function(_, o) {
		return {
			t: $(o).text(),
			v: o.value
		};
	}).get();
	arr.sort(function(o1, o2) {
		var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

		return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	});
	options.each(function(i, o) {
		//console.log(i);
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});
}


function showLoadingIcon(){

	$('#loading').dialog({
		title : 'Loading... please wait',
		resizable : false,
		modal : true,
		open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); }

	});
}

function closeLoadingIcon(){
	$('#loading').dialog("close");
}

function populateFrmTeamDropDown(){
	$.get('team/getallteams', {

	}).done(
			function(json) {


				$('select#teamId').empty();

				$('select#teamId').append(
						new Option("- Select -", ""));

				for ( var i = 0; i < json.length; i++) {
					if(json[i].teamName != 'ADMIN') {
						$('select#teamId')
						.append(
								new Option(json[i].teamName,
										json[i].id));
					}
				}

			}).fail(function(jqxhr, textStatus, error) {
				$('select#teamId').val("");
			});

}

function registerTeamChangeEvt(){
	$("select#teamId").change(
			function() {
				$.get('group/getgroups', {
					id : $('select#teamId').val()
				}).done(
						function(json) {


							$('select#groupId').empty();

							$('select#groupId').append(
									new Option("- Select -", ""));

							for ( var i = 0; i < json.length; i++) {
								$('select#groupId')
								.append(
										new Option(json[i].groupName,
												json[i].id));
							}

							
						}).fail(function(jqxhr, textStatus, error) {
							$('select#groupId').val("");
						});


			});

}

function initDownloadFrmrReport() {
	$('#btnfrmrpt').click(function(e) {

		downloadFarmerExcelRpt();
	});
}

function downloadFarmerExcelRpt() {
	
	
	if($('select#fieldstaff').val()>0){
		
		
		if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null && $("select#nvillageid1").val()!=null)
         {
			
			window.location.href ="former/farmerreportbystaff?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+$("select#npanchayatid1").val()
					+"&villageid="+$("select#nvillageid1").val()
			}		
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null)
         {
			
			window.location.href = "former/farmerreportbystaff?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+$("select#npanchayatid1").val()
					+"&villageid="+0
			}	
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null)
         {
			
			window.location.href ="former/farmerreportbystaff?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+$("select#nblockid1").val()
					+"&panchayatid="+0
					+"&villageid="+0
			}	
		else if($("select#ndistrictid1").val()!=0)
         {
			
			window.location.href = "former/farmerreportbystaff?id="
					+ $("select#fieldstaff").val()
					+"&districtid="+$("select#ndistrictid1").val()
					+"&blockid="+0
					+"&panchayatid="+0
					+"&villageid="+0
			}
		else{
			
			window.location.href = "former/farmerreportbystaff?id="
				+ $("select#fieldstaff").val()
				+"&districtid="+0
				+"&blockid="+0
				+"&panchayatid="+0
				+"&villageid="+0
		}
		
		// search by field staff					
	} 
	
	else if ($("select#teamlist").val()>0 || $("select#teamlist").val()==0) {
		//search team
		
		
		if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null && $("select#nvillageid1").val()!=null)
         {
			
			window.location.href = "former/farmerreportbyteams?id="
			+ $("select#teamlist").val()
			+"&did="+$("select#ndistrictid1").val()
			+"&bid="+$("select#nblockid1").val()
			+"&pid="+$("select#npanchayatid1").val()
			+"&vid="+$("select#nvillageid1").val()
			}		
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null
				&& $("select#npanchayatid1").val()!=null)
         {
			
			window.location.href = "former/farmerreportbyteams?id="
			+ $("select#teamlist").val()
			+"&did="+$("select#ndistrictid1").val()
			+"&bid="+$("select#nblockid1").val()
			+"&pid="+$("select#npanchayatid1").val()
			+"&vid="+0
			}	
		else if($("select#ndistrictid1").val()!=0 && $("select#nblockid1").val()!=null)
         {
			
			window.location.href = "former/farmerreportbyteams?id="
			+ $("select#teamlist").val()
			+"&did="+$("select#ndistrictid1").val()
			+"&bid="+$("select#nblockid1").val()
			+"&pid="+0
			+"&vid="+0
			}	
		else if($("select#ndistrictid1").val()!=0)
         {
			
			window.location.href = "former/farmerreportbyteams?id="
			+ $("select#teamlist").val()
			+"&did="+$("select#ndistrictid1").val()
			+"&bid="+0
			+"&pid="+0
			+"&vid="+0
			}
		else if($("select#teamlist").val()!=0){
		
		window.location.href = "former/farmerreportbyteam?teamid="
			+ $("select#teamlist").val();
		}
		
		else{
			window.location.href = "former/farmerreportbyallteam";
		}
		
	} 
	
//	else if ($("select#teamlist").val()==0) {
//		//search team
////		window.location.href = "former/farmerreportbyallteam";
////		window.location.href = "former/farmerreportbyteams?id="
////			+ $("select#teamlist").val()
////			+"&did="+$("select#ndistrictid1").val()
////			+"&bid="+0
////			+"&pid="+0
////			+"&vid="+0
//	} 
	
	else {
		window.location.href = "former/farmerreportbystaff?staffId=0";
	}
	//window.location.href = "former/farmerreport";
}

function validateFarmerForm() {
	/*$("#tpconfrm").validate({
		rules : {
			name : {
				required : true
			},
			fatherName : {
				required : true
			},
			contactNumber : {
				number: true
			},
			village : {
				required : true
			},
			district : {
				required : true
			},
			formSize : {
				required : true,
				number: true
			},
			teamId : {
				required : true
			},
			ndistrictid : {
				required : true
			},
			nblockid : {
				required : true
			},
			npanchayatid : {
				required : true
			},
			nvillageid : {
				required : true
			},
			groupId : {
				required : true
			},
			communityId : {
				required : true
			},
			genderid : {
				required : true
			},
			casteid : {
				required : true
			},
			familySize : {
				required : true

			}
		},
		messages : {
			name : {
				required : "Enter the Name"
			},
			fatherName : {
				required : "Enter the Father name"
			},
			contactNumber : {
				number : "Enter Number Only "
			},
			village : {
				required : "Enter the Village"
			},
			district : {
				required : "Enter the District"
			},
			formSize : {
				required : "Enter the Form size",
				number : "Enter Number Only "
			},
			teamId : {
				required : "Choose team"
			},
			ndistrictid : {
				required : "Choose District"
			},
			nblockid : {
				required : "Choose Block"
			},
			npanchayatid : {
				required : "Choose Panchayat"
			},
			nvillageid : {
				required : "Choose Village"
			},
			groupId : {
				required : "Choose group"
			},
			communityId : {
				required : "Choose community"
			},
			genderid : {
				required : "Choose gender"
			},
			casteid : {
				required : "Choose caste"
			},
			familySize : {
				required : "Enter number of family members"
			}
		}
	});*/
}

function populateGroup() {
	$("select#teamId").change(
			function() {
				$.get('group/getgroups', {
					id : $('select#teamId').val()
				}).done(
						function(json) {
							$('select#groupId').empty();
							for (var i = 0; i < json.length; i++) {
								$('select#groupId')
								.append(
										new Option(json[i].groupName,
												json[i].id));
							}

						}).fail(function(jqxhr, textStatus, error) {
							$('select#groupId').val("");
						});
			});
}

function custom_alert(output_msg, title_msg, divtoAlert) {
	if (!title_msg)
		title_msg = 'Alert';

	if (!output_msg)
		output_msg = 'No Message to Display.';

	$(divtoAlert).html(output_msg).dialog({
		title : title_msg,
		resizable : false,
		modal : true,
		buttons : {
			"Ok" : function() {
				$(this).dialog("close");
			}
		}
	});
}

function readURL(input) {
	var image = document.getElementById("file").value;
	//alert('read image');
	if (image != '') {
		var checkimg = image.toLowerCase();
		if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
			alert("Please enter Image File Extensions .jpg,.png,.jpeg");
			document.getElementById("image").focus();
			return false;
		} else {

			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function(e) {
					$('#photourl').attr('src', e.target.result);
				};

				reader.readAsDataURL(input.files[0]);
			}
		}
	}
}

function initFormerTable() {
    formerTable = $('#formertable').dataTable({
			"bJQueryUI" : true,
			"bPaginate" : true,
			"sPaginationType": "full_numbers",
			"bLengthChange" : false,
			"bFilter" : true,
			"bInfo" : true,
			"responsive": true,
			"autoWidth": false,
			 "language" : {
                "loadingRecords": '&nbsp;',
                "processing": "<img src='img/loading.gif'>"
        },
			
			"oLanguage": {
		        "sEmptyTable":     "No Records"
		    },
		//	 "sAjaxSource" : "myproduct/getallmyproducts", 
			"sAjaxDataProp" : "",
			"aaSorting" : [ [ 0, "asc" ] ],
			
			"aoColumns" : [ {
			"sWidth" : "15%",
			"mData" : "name"
		}, {
			"sWidth" : "15%",
			"mData" : "fatherName"
		}, {
			"sWidth" : "10%",
			"mData" : "village"
		}, {
			"sWidth" : "10%",
			"mData" : "teamName"
		}, {
			"sWidth" : "10%",
			"mData" : "community"
		}, {
			"sWidth" : "10%",
			"mData" : "uploadedby"
		}, {
			"sWidth" : "10%",
			"mData" : "uploadedon"
		}, {
			"bSortable" : false,
			"sClass" : "center",
			"sWidth" : "10%",
			"mData" : null,
			"mRender" : makeEditFormLink
		}, {
			"bSortable" : false,
			"sClass" : "center",
			"sWidth" : "10%",
			"mData" : null,
			"mRender" : makeDeleteFormLink
		}]
	});
}

function makeEditFormLink(data, type, full) {
	return "<a href='javascript:void(0)' onclick=\"editFormDetail("
	+ full['id'] + ",'" + full['name'] + "','" + full['fatherName']
	+ "','" + full['address'] + "','" + full['village'].replace(/\n/,"") + "','"
	+ full['district'] + "','" + full['formSize'] + "','" + full['teamId'] + "','" + full['groupId'] +
			"','" + full['ndistrictid'] +
			"','" + full['nblockid'] + 
			"','" + full['npanchayatid'] + 
			"','" + full['nvillageid'] + "','"
	+ full['photourl'] + "','" + full['communityId']
	+ "','" + full['genderid'] +"','" + full['casteid'] +"','"+ full['uploadedby'] 
	+ "','"+ full['contactNumber'] +"','"+ full['uploadedon'] +"','"+ full['familySize'] +"')\"><button title='Edit' class='btn btn-edit btn-warning btn-xs'><i class='fa fa-pencil'></i> Edit</button> </a>";
}

function makeDeleteFormLink(data, type, full) {
	if($('#role').val() == 'staff'){
		return "";
	} 

	return "<a href='javascript:void(0)' onclick='deleteFormDetail("
	+ full['id']
	+ ")'\"><button title='Delete' class='btn btn-hapus  btn-danger btn-xs'><i class='fa fa-remove'></i> Delete</button></a>";

}



function editFormDetail(id, name, fatherName, address, village, district,
		formSize, team, groupId,ndistrictid,nblockid,npanchayatid,nvillageid, photourl, communityId,gender,caste,uploadedby,contactNumber,uploadedon,
		familySize) {
	$("#modal-farmer").modal("show");
	if(fatherName == 'null'){
		fatherName = '';
	}
	if(address == 'null'){
		address = '';
	}

	if(contactNumber == 'null'){
		contactNumber = '';
	}
	if(district == 'null'){
		district = '';
	}
	if(formSize == 'null'){
		formSize = '';
	}
	//alert("uploadedby : " + uploadedby);
	if(uploadedby == 'null' || uploadedby==''){
		$('label[id*="uploadby"]').text('');
		//$('#uploadby').text();
	} else {
		$('#uploadby').text("Uploaded by : "+uploadedby+" on "+uploadedon);
	}

	//searchText = $('#tblform_filter').find('input[type="text"]').val();
	//console.log(teamId);
	$('#name').val(name);
	$('#fatherName').val(fatherName);
	$('#contactNumber').val(contactNumber);
	$('#village').val(village);
	$('#village').prop('disabled', 'disabled');
	$('#district').val(district);
	$('#district').prop('disabled', 'disabled');
	$('#familySize').val(familySize);
	$('#formSize').val(formSize);
	$('#id').val(id);
	
	fid=id;
	//$('#teamId').val(teamName);
//	alert(ndistrictid);
//	alert(nblockid);
//	alert(npanchayatid);
//	alert(nvillageid);
	$('select#teamId').val(team);
	$('select#ndistrictid').val(ndistrictid);
	blockdropdown(ndistrictid,nblockid);
//	$('select#nblockid').val(nblockid);
	panchayatdropdown(nblockid,npanchayatid);
//	$('select#npanchayatid').val(npanchayatid);
	villagedropdown(npanchayatid,nvillageid);
//	$('select#nvillageid').val(nvillageid);
	
	
	
	$('select#communityId').val(communityId);
	$('select#genderid').val(gender);

	$('select#casteid').val(caste);
	//$('select#groupid1').val(groupId);
	/*alert(team);
	if(team != 13){
		$("#name").attr("disabled", "disabled"); 
	} */

	$.get('group/getgroups', {
		id : $('select#teamId').val()
	}).done(
			function(json) {
				$('select#groupId').empty();
				for (var i = 0; i < json.length; i++) {
					$('select#groupId')
					.append(
							new Option(json[i].groupName,
									json[i].id));
				}

			}).fail(function(jqxhr, textStatus, error) {
				$('select#groupId').val("");
			});

	$('select#groupId').val(groupId);

	//$('#file').val(id);
	var url = "former/get/" + id;

	$('#photourl').attr('src', url);

	$("#divform").dialog({
		modal : true,
		width : '750px',
		async : false,
		resizable : false,
		buttons : {
			Update : function() {
				$('#team').val($('select#teamId').val());
				//alert('yes');
				if($("#tpconfrm").valid()){
					updateFormDetail();
				}
				/*	if(team == 13){
				} else {
					//$("#name").removeAttr("disabled");
					$("#tpconfrm").submit();
				}*/


				//$("#tpconfrm").submit();


				/*$.get('former/checkfarmernameexist',{
					id : id,
					name : $("#name").val()
				}).done(function(json){
					if(json == true){
						alert ('Farmer name already exist');
						//custom_alert('Farmer name already exist',
							//	"Plantation", "#successInfo");
					} else {
						//$("#name").removeAttr("disabled");
						$("#tpconfrm").submit();
					}
				}).fail(function(jqxhr,textStatus,error){

				});*/


				//$("#tpconfrm").submit();

				//alert(searchText);

				/*$("#divform").dialog('destroy');
				$('#name').val("");
				$('#fatherName').val("");
				$('#address').val("");
				$('#village').val("");
				$('#district').val("");
				$('#formSize').val("");
				$('#id').val("");
				$('select#teamId').val(0);
				$('select#groupId').val(0);
				$('select#communityId').val(0);
				formerTable.fnReloadAjax();*/
			},

			Cancel : function() {
				// $(this).dialog('destroy');
				$("#divform").dialog('destroy');
				$('#name').val("");
				$('#fatherName').val("");
				$('#address').val("");
				$('#village').val("");
				$('#district').val("");
				$('#formSize').val("");
				$('#familySize').val("");
				$('#id').val("");
				$('select#teamId').val("");
				$('select#groupId').val("");
				$('select#communityId').val("");
				$('select#gender').val("");
				$('select#caste').val("");
			}
		}

	});


}



function deleteFormDetail(id) {

	
	var confirmBox = 'Do you want to Delete Farmer Details?';
	var titleConfirm = 'Plantation Proj - Delete';
	
	swal({
	    title: "Are you sure?",
	    text: "Do you want to delete farmer details?",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: '#DD6B55',
	    confirmButtonText: 'Yes',
	    cancelButtonText: "No",
	    closeOnConfirm: false,
        closeOnCancel: false 
	 },
	 function(isConfirm){

		   if (isConfirm){
			   
			   confirmdeleteFormDetail(id);
		    } else {
		    	swal("Cancelled", "Delete operation cancelled", "error");
		    }
		 });
	
	

}

function confirmdeleteFormDetail(id) {
	$.get('former/deleteform', {
		Id : id
	}).done(
			function(json) {

				swal({
					title: 'Deleted!',
					text: 'Farmer Details Deleted Successfully',
					icon: 'success'
					 })
				formerTable.fnReloadAjax();
			}).fail(function(jqxhr, textStatus, error) {

				//custom_alert('Failed', "Plantation Proj - Failure", "#errorInfo");
			});
}

function initNewFormer() {

	$('#btnnewformer').click(function(e) {

		e.preventDefault();
		
		$("#modal-farmer").modal("show");
		
		fid=0;
		
		$('#name').val("");
		$('#fatherName').val("");
		$('#contactNumber').val("");
//		$('#village').val("");
//		$('#district').val("");
		$('#formSize').val("");
		$('#familySize').val("");
		$('#id').val("");
		$('#file').val("");

		$('#communityId').val("");
		$('#groupId').val("");
		$('#genderid').val("");

		$('#casteid').val("");
		$('#photourl').attr('src', 'resources/img/default_image.png');
		$('label[id*="uploadby"]').text('');
		$('select#ndistrictid').val(0);
		$('select#nblockid').empty();
		$('select#npanchayatid').empty();
		$('select#nvillageid').empty();

		if($('#role').val() == 'staff'){
			//formerTable.fnReloadAjax("former/getmappedfarmersbystaff?id="+$('#uid').val());
			//alert($('#userteamname').val());
			$('select#teamId').empty();
			$('select#teamId')
			.append(
					new Option($('#userteamname').val(),
							$('#userteamid').val()));
			
			
			$.get('group/getgroups', {
				id : $('select#teamId').val()
			}).done(
					function(json) {
						$('select#groupId').empty();
						for (var i = 0; i < json.length; i++) {
							$('select#groupId')
							.append(
									new Option(json[i].groupName,
											json[i].id));
						}

					}).fail(function(jqxhr, textStatus, error) {
						$('select#groupId').val("");
					});
		
		}
		
		

	/*	$("#divform").dialog({
			modal : true,
			width : '50%',
			resizable : false,
			buttons : {
				Save : function() {
				          
					

				},

				Cancel : function() {
					//$('#gender').val("");
					//$('#caste').val("");
					$(this).dialog('destroy');
				}
			}

		});*/

	});
}




function registerSaveEvt(){
	
	$("#btn-save").click(function(){
		
		if($('#name').val()!="") {	
			$.get('former/checkfarmernameexist',{
				id : fid,
				name : $("#name").val()
			}).done(function(json){
				if(json == true){
					
					swal("Farmer name already exist");
				} else {
					
			if($('#fatherName').val()!="") {
				if($('#contactNumber').val()!="") {
					if($('#ndistrictid').val()!=0) {
						if($('#nblockid').val()!=0) {
							if($('#npanchayatid').val()!=0) {
								if($('#nvillageid').val()!=0) {
									if($('#communityId').val()!="") {
										if($('#genderid').val()!="") {
											if($('#casteid').val()!="") {
												if($('#familySize').val()!="") {
													if($('#formSize').val()!="") {
														if($('#teamId').val()!="") {
															if($('#groupId').val()!="") {
																if(fid==0)
						                                        save();
																else
																updateFormDetail(fid);	
															} else {
																swal("Please Select Group");
																return;
															}
														} else {
															swal("Please Select Team");
															return;
														}
													} else {
														swal("Please Enter Farm Size (cents)");
														return;
													}
												} else {
													swal("Please Enter Family Size");
													return;
												}
											} else {
												swal("Please Select Caste");
												return;
											}
										} else {
											swal("Please Select Gender");
											return;
										}
									} else {
										swal("Please Select Community");
										return;
									}
								} else {
									swal("Please Select Village");
									return;
								}
							} else {
								swal("Please Select Panchayat");
								return;
							}
						} else {
							swal("Please Select Block");
							return;
						}
					} else {
						swal("Please Select District");
						return;
					}
				} else {
					swal("Please Enter Contact Number");
					return;
				}
			} else {
				swal("Please Enter the Father/Husband Name");
				return;
			}
					
			//	save();
					
				}
			})
			
			
	} else {
		swal("Please Enter the Name");
		return;
	}
				
	});
}


function save() {
//	alert($('#userid').val());
	var formData = new FormData();
	//formData.append('file', $('input[type=file]')[0].files[0]);
	formData.append('id',0);
	formData.append('name',$('#name').val());
	formData.append('fatherName',$('#fatherName').val());
	// formData.append('address',$('#txtaddress').val());
	//formData.append('village',$('#village').val());

	formData.append('contactNumber',$('#contactNumber').val());
	formData.append('familySize',$('#familySize').val());
	formData.append('communityId',$('select#communityId').val());

//	formData.append('district',$('#district').val());
	formData.append('formSize',$('#formSize').val());
	formData.append('teamId',$('select#teamId').val());
	
	formData.append('ndistrictid',$('select#ndistrictid').val());
	formData.append('nblockid',$('select#nblockid').val());
	formData.append('npanchayatid',$('select#npanchayatid').val());
	formData.append('nvillageid',$('select#nvillageid').val());

	formData.append('groupId',$('select#groupId').val());
	formData.append('gender',$('select#genderid').val());
	formData.append('caste',$('select#casteid').val());
//	alert(files);
	if (typeof files != 'undefined') {

	$.each(files, function(key, value) {
		formData.append(key, value);
	});
	}
	formData.forEach(function(value, key){
		formData[key] = value;
	});
	var json = JSON.stringify(formData);

//	console.log('data:'+String(json));
//	alert("data:"+String(json));
//	alert("step1");
	//console.log("form data " + formData);
	
//	$.post('former/formernamevalidate', {
//		name : $('#txtteam').val(),
//	
//	}).done(
//			function(json) {
//
//				if(json==true){
//				custom_alert("Former Name Already Exist check", "Plantation Proj - Sucess",
//						"#successInfo");
//			}
//				else{
				$.ajax({
					url : 'former/updateform',
					type : 'POST',
					data : formData,
					cache : false,
					async : false,
					processData : false,
					contentType : false,
					success : function(data) {
//						$("#divform").dialog('destroy');
						$('#name').val("");
							$('#fatherName').val("");
							$('#address').val("");
							$('#village').val("");
							$('#district').val("");
							$('#formSize').val("");
							$('#familySize').val("");
							$('#id').val("");
							$('select#teamId').val("");
							$('select#ndistrictid').val("");
							$('select#nblockd').val("");
							$('select#npanchayatd').val("");
							$('select#nvillageid').val("");
							$('select#groupId').val("");
							$('select#communityId').val("");
							$('select#gender').val("");
							$('select#caste').val("");
						$("#modal-farmer").modal("hide");
						swal({
					          title: 'Saved!',
					          text: 'Farmer Details Created Successfully!',
					          icon: 'success'
					        })
							formerTable.fnReloadAjax();
					},
					error : function(jqXHR, textStatus, errorThrown) {
//						alert('Failed2 : ' + textStatus);
						
//						alert("error");
					}
				});
//				}
//			});
	

}

function updateFormDetail(id) {
	/*	alert($('#name').val());
		var data = {};
		data["name"] = $('#name').val();
	*/	var formData = new FormData();
		//formData.append('file', $('input[type=file]')[0].files[0]);
		formData.append('id',id);
		formData.append('name',$('#name').val());
		formData.append('fatherName',$('#fatherName').val());
		// formData.append('address',$('#txtaddress').val());

		formData.append('contactNumber',$('#contactNumber').val());
		formData.append('familySize',$('#familySize').val());
		formData.append('communityId',$('select#communityId').val());

		formData.append('formSize',$('#formSize').val());
		formData.append('teamId',$('select#teamId').val());
		
		formData.append('ndistrictid',$('select#ndistrictid').val());
		formData.append('nblockid',$('select#nblockid').val());
		formData.append('npanchayatid',$('select#npanchayatid').val());
		formData.append('nvillageid',$('select#nvillageid').val());

		formData.append('groupId',$('select#groupId').val());
		formData.append('gender',$('select#genderid').val());
		formData.append('caste',$('select#casteid').val());
		//alert(files);
		if (typeof files != 'undefined') {
		//Iterate the file object
		$.each(files, function(key, value) {
			formData.append(key, value);
		});
		}
		//console.log("form data " + formData);
		
					$.ajax({
						url : 'former/updateform',
						type : 'POST',
						data : formData,
						cache : false,
						async : false,
						processData : false,
						contentType : false,
						success : function(data) {

							$('#name').val("");
								$('#fatherName').val("");
								$('#address').val("");
								$('#village').val("");
								$('#district').val("");
								$('#formSize').val("");
								$('#familySize').val("");
								$('#id').val("");
								$('select#teamId').val("");
								$('select#ndistrictid').val("");
								$('select#nblockd').val("");
								$('select#npanchayatd').val("");
								$('select#nvillageid').val("");
								$('select#groupId').val("");
								$('select#communityId').val("");
								$('select#gender').val("");
								$('select#caste').val("");

								$("#modal-farmer").modal("hide");
								 swal({
							          title: 'Saved!',
							          text: 'Farmer Details Updated Successfully!',
							          icon: 'success'
							        })
							formerTable.fnReloadAjax();
							
						},
						error : function(jqXHR, textStatus, errorThrown) {
							alert('Failed2 : ' + textStatus);
						}
					});
				
			
			/*$.post('former/updateform', {
			id : $('#id').val(),
			name : $('#txtname').val(),
			fatherName : $('#txtfathername').val(),
			address : $('#txtaddress').val(),
			village : $('#txtvillage').val(),
			district : $('#txtdistrict').val(),
			formSize : $('#txtformsize').val(),
			teamId: $('select#teamId').val(),2
			groupId: $('select#groupId').val(),
			gender: $('select#genderid').val(),
			caste: $('select#casteid').val()

		}).done(
				function(json) {

					custom_alert('Farmer Details Updated Successfully',
							"Plantation Proj - Sucess", "#successInfo");

					$("#divform").dialog('destroy');
					$('#txtname').val("");
					$('#txtfathername').val("");
					$('#txtaddress').val("");
					$('#txtvillage').val("");
					$('#txtdistrict').val("");
					$('#txtformsize').val("");
					$('#id').val("");
					$('select#teamId').val("");
					$('select#groupId').val("");
					formerTable.fnReloadAjax();
				}).fail(function(jqxhr, textStatus, error) {

					custom_alert('Failed', "Plantation Proj - Failure", "#errorInfo");
					$("#divform").dialog('destroy');
					$('#txtname').val("");
					$('#txtfathername').val("");
					$('#txtaddress').val("");
					$('#txtvillage').val("");
					$('#txtdistrict').val("");
					$('#txtformsize').val("");
					$('#id').val("");
					$('select#teamId').val("");
					$('select#groupId').val("");
				});*/

	}

function reloadAjaxDatatablesPlugin(oSettings, sNewSource, fnCallback,
		bStandingRedraw) {
	// DataTables 1.10 compatibility - if 1.10 then `versionCheck` exists.
	// 1.10's API has ajax reloading built in, so we use those abilities
	// directly.
	if (jQuery.fn.dataTable.versionCheck) {
		var api = new jQuery.fn.dataTable.Api(oSettings);

		if (sNewSource) {
			api.ajax.url(sNewSource).load(fnCallback, !bStandingRedraw);
		} else {
			api.ajax.reload(fnCallback, !bStandingRedraw);
		}
		return;
	}

	if (sNewSource !== undefined && sNewSource !== null) {
		oSettings.sAjaxSource = sNewSource;
	}

	// Server-side processing should just call fnDraw
	if (oSettings.oFeatures.bServerSide) {
		this.fnDraw();
		return;
	}

	this.oApi._fnProcessingDisplay(oSettings, true);
	var that = this;
	var iStart = oSettings._iDisplayStart;
	var aData = [];

	this.oApi._fnServerParams(oSettings, aData);

	oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource,
			aData, function(json) {
				/* Clear the old information from the table */
				that.oApi._fnClearTable(oSettings);

				/* Got the data - add it to the table */
				var aData = (oSettings.sAjaxDataProp !== "") ? that.oApi
						._fnGetObjectDataFn(oSettings.sAjaxDataProp)(json)
						: json;

				for (var i = 0; i < aData.length; i++) {
					that.oApi._fnAddData(oSettings, aData[i]);
				}

				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

				that.fnDraw();

				if (bStandingRedraw === true) {
					oSettings._iDisplayStart = iStart;
					that.oApi._fnCalculateEnd(oSettings);
					that.fnDraw(false);
				}

				that.oApi._fnProcessingDisplay(oSettings, false);

				/* Callback user function - for event handlers etc */
				if (typeof fnCallback == 'function' && fnCallback !== null) {
					fnCallback(oSettings);
				}
			}, oSettings);
};

function registerClearDataTabaleSearchFilter() {
	$.fn.dataTableExt.oApi.fnFilterClear = function(oSettings) {
		var i, iLen;

		/* Remove global filter */
		oSettings.oPreviousSearch.sSearch = "";

		/* Remove the text of the global filter in the input boxes */
		if (typeof oSettings.aanFeatures.f != 'undefined') {
			var n = oSettings.aanFeatures.f;
			for (i = 0, iLen = n.length; i < iLen; i++) {
				$('input', n[i]).val('');
			}
		}

		/*
		 * Remove the search text for the column filters - NOTE - if you have
		 * input boxes for these filters, these will need to be reset
		 */
		for (i = 0, iLen = oSettings.aoPreSearchCols.length; i < iLen; i++) {
			oSettings.aoPreSearchCols[i].sSearch = "";
		}

		/* Redraw */
		oSettings.oApi._fnReDraw(oSettings);
	};
}