$(document).ready(function () {


  crsfToken = document.getElementsByName("_token")[0].value;

  var url = '{{ route("uploadPhoto") }}';

  $('#txtSearch').keyup(function (event) {
    if (event.keyCode == 13) {
      $('#btnSearch').click();
    }
  });

  $(document).keyup(function (event) {
    if (event.keyCode == 27) {
      closeNav();
    }
  });


  $('.login').click(function () {
    // alert('login');
    $('#login-modal').modal('open');
  });


  // TODO: Get the scroll position only on the main page
  $(function() {
    var pathName = document.location.pathname;
    if (pathName == '/') {
      $(window).on('unload', function() {
        var scrollPosition = $(window).scrollTop();
        sessionStorage.setItem("scrollPosition", scrollPosition);
      });
      if(sessionStorage.scrollPosition && sessionStorage.filter) {
        $(window).scrollTop(sessionStorage.getItem("scrollPosition"));

        var tab = sessionStorage.getItem("filter");
        var token = $('input[name="_token"]').val();

        $('.filterTab[data-tab="' + tab + '"]').click();
      }
    }
  });

  $(document).on('click', '.like', function () {
    var $this = $(this);

    $this.prop('disabled', true);

    var entityType = $this.attr('data-entity-type');
    var entityId = $this.attr('data-entity-id');
    var user = $this.attr('data-user');
    var entityOwner = $this.attr('data-entity-owner');

    var token = $this.attr('token');

    $.ajax({
      'type': 'post',
      'url': '/ajax/like',
      'data': {
        'entityId': entityId,
        'entityType': entityType,
        'userId': user,
        'entityOwner': entityOwner,
        '_token': token
      },
      success: function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 200) {
          $this.removeClass('like').addClass('liked');
          $this.parent().find('.pointsNumber').html(obj.total);
          $('#likesNo_' + entityId).html(obj.total);
          $this.children().addClass('red-text');
        }
        $this.prop('disabled', false);
      },
//			error: function(){
//				console.log('error');
//			}
    });
  });

  $(document).on('click', '.dislike', function () {
    var $this = $(this);

    var entityType = $this.attr('data-entity-type');
    var entityId = $this.attr('data-entity-id');
    var user = $this.attr('data-user');
    var token = $this.attr('token');

    $.ajax({
      'type': 'post',
      'url': '/ajax/dislike',
      'data': {
        'entityId': entityId,
        'entityType': entityType,
        'userId': user,
        '_token': token
      },
      success: function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 200) {
          var span = $this.find('.glyphicon');
          span.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
          $this.removeClass('imgLike').addClass('imgUnlike');

        }
      },
//			error: function(){
//				console.log('error');
//			}
    });
  });

  $(document).on('click', '.liked', function () {
    $this = $(this);

    var entityType = $this.attr('data-entity-type');
    var entityId = $this.attr('data-entity-id');
    var user = $this.attr('data-user');
    var token = $this.attr('token');
    var entityOwner = $this.attr('data-entity-owner');

    $.ajax({
      'type': 'post',
      'url': '/ajax/unlike',
      'data': {
        'entityId': entityId,
        'entityType': entityType,
        'entityOwner': entityOwner,
        'userId': user,
        '_token': token
      },
      success: function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 200) {
          $this.removeClass('liked').addClass('like');
          // $('#totalPoints').html(obj.total);
          $this.parent().find('.pointsNumber').html(obj.total);
          $('#likesNo_' + entityId).html(obj.total);
          $this.children().removeClass('red-text');
        }
      },
//			error: function(){
//				console.log('error');
//			}
    });
  });
  $(document).on('click', '.disliked', function () {
    $this = $(this);

    var entityType = $this.attr('data-entity-type');
    var entityId = $this.attr('data-entity-id');
    var user = $this.attr('data-user');
    var token = $this.attr('token');

    $.ajax({
      'type': 'post',
      'url': '/ajax/undislike',
      'data': {
        'entityId': entityId,
        'entityType': entityType,
        'userId': user,
        '_token': token
      },
      success: function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 200) {
          var span = $this.find('.glyphicon');
          span.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
          $this.removeClass('imgUnlike').addClass('imgLike');

        }
      },
//			error: function(){
//				console.log('error');
//			}
    });
  });

  $(document).on('click', '.delete-comment', function () {
    $this = $(this);

    var entityType = $this.attr('data-entity-type');
    var entityId = $this.attr('data-entity-id');
    var user = $this.attr('data-user');
    var token = $this.attr('token');

    $.ajax({
      'type': 'post',
      'url': '/ajax/delete-comment',
      'data': {
        'entityId': entityId,
        'entityType': entityType,
        'userId': user,
        '_token': token
      },
      success: function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 200) {
          var span = $this.find('.glyphicon');
          span.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
          $this.removeClass('imgUnlike').addClass('imgLike');

        }
      },
//			error: function(){
//				console.log('error');
//			}
    });
  })

  $('#frmAddComment').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      'type': 'post',
      'url': '/video/comment',
      data: new FormData(this),
      beforeSend: function () {
        $('#btnSubmitComment').attr('disabled', true);
        $('#commentPlaceholder').append('<div class="progress" id="progressBar">\n' +
          '      <div class="indeterminate"></div>\n' +
          '  </div>');
      },
      contentType: false,
      processData: false,
      success: function (data) {
        removeAttachment('#newCommentAttachment');
        $('#progressBar').remove();
        $('#btnSubmitComment').removeAttr('disabled');
        $('#tabs-comments-latest').html(data);
        $('ul.tabs').tabs('select_tab', 'tabs-comments-latest');
        $('#txtCommentBody').val('');
        $this.prop('disabled', false);

        $this.parent().parent().prepend('<div class="row"><div class="green-text center commentResponse">Your comment was posted!</div></div>');
        Materialize.toast('Your comment was posted!', 3000, 'green');

        setTimeout(function () {
          $('.commentResponse').remove();
        }, 3000);
      }
    });
  });

  $(document).on('click', '#btnSubmitComment', function () {

    var $this = $(this);
    $('.commentResponse').remove();

    var comment = $('#txtCommentBody').val();
    var user = $('#hdnUserId').val();
    var entity = $('#hdnEntityId').val();
    var entityType = $('#hdnEntityType').val();
    var token = $('input[name="_token"]').val();

    if (comment == '') {
      $this.parent().parent().prepend('<div class="row"><div class="red-text center commentResponse">Comment should not be empty!</div></div>');
      Materialize.toast('Comment should not be empty!', 3000, 'red');
      return false;
    }

    $('#frmAddComment').submit();
    return false;

    $this.prop('disabled', true);
    $.ajax({
      'type': 'post',
      'url': '/video/comment',
      data: {
        user: user,
        comment: comment,
        entity: entity,
        entityType: entityType,
        _token: token
      },
      success: function (data) {
        $('#tabs-comments-latest').html(data);
        $('ul.tabs').tabs('select_tab', 'tabs-comments-latest');
        $('#txtCommentBody').val('');
        $this.prop('disabled', false);

        $this.parent().parent().prepend('<div class="row"><div class="green-text center commentResponse">Your comment was posted!</div></div>');
        Materialize.toast('Your comment was posted!', 3000, 'green');
        setTimeout(function () {
          $('.commentResponse').remove();
        }, 3000);
      }
    });

  });

  $(document).on('click', '#btnSendContact', function () {
    var name = $('#txtContactName').val();
    var email = $('#txtContactEmail').val();
    var message = $('#txtContactMessage').val();
    var token = $(this).attr('token');

    $.ajax({
      type: 'post',
      url: '/contact/send',
      data: {
        _token: token,
        name: name,
        email: email,
        message: message
      },
      success: function (response) {
        $('#modalform').modal('close');
      }
    })
  });

  $(document).on('click', '#btnUserRedeemPoints', function () {
    var code = $('#txtCouponCode').val();
    var token = $(this).attr('token');
    $this = $(this);

    $this.attr('disabled', true);
    // return false;

    $.ajax({
      type: 'post',
      url: '/ajax/redeem-points',
      data: {
        code: code,
        _token: token
      },
      success: function (data) {
        var response = JSON.parse(data);

        if (response.type == 'error') {
          $('#redeemResponse').removeClass('green-text center');
          $('#redeemResponse').addClass('red-text center');
        } else {
          $('#redeemResponse').removeClass('red-text center');
          $('#redeemResponse').addClass('green-text center');
          $('#txtCouponCode').val('');
          setTimeout(function () {
            $('#redeem').modal('close');
          }, 3000);
        }
        $('#redeemResponse').html(response.message);
        setTimeout(function () {
          $this.removeAttr('disabled');
        }, 500);
      }
    })
  });

  $(document).on('click', '#btnSubmitNewPost', function () {
    var title = $('#txtPostTitle');
    var topic = $('#ddlPostTopic');
    var description = $('#txtPostDescription');
    var er = true;

    $('.invalid').removeClass('invalid');
    if (title.val() == '') {
      title.addClass('invalid');
      er = false;
    }
    if (!topic.val()) {
      topic.addClass('invalid');
      $('.select-dropdown').addClass('invalid');
      er = false;
    }
    if (description.val() == '') {
      description.addClass('invalid');
      er = false;
    }

    return er;
  });

  $(document).on('click', '#btnVideoShare', function () {
    var url = $('#url').val();
    var token = $('input[name=_token]').val();

    $.ajax({
      type: 'post',
      url: '/ajax/share-video',
      data: {
        url: url,
        _token: token
      },
      success: function (response) {

        response = JSON.parse(response);

        $('#videoPreview').show();
        $('#previewTitle').val(response.title);
        $('#previewThumbnail').html('<img src="' + response.thumbnail_high.url + '" style="width: 600px; height: auto;" />');
        $('#previewDescription').val(response.description);
        $('#hdnShareVideoId').val(response.ytId);
        $('#hdnShareVideoTags').val(response.tags);
        $('#hdnShareVideoThumb').val(response.thumbnail_high.url);
        Materialize.updateTextFields();
      }
    })
  });

  $(document).on('click', '#btnSaveVideoShare', function () {
    var token = $('input[name=_token]').val();
    var title = $('#previewTitle').val();
    var ytId = $('#hdnShareVideoId').val();
    var description = $('#previewDescription').val();
    var thumbnail = $('#hdnShareVideoThumb').val();
    var tags = $('#hdnShareVideoTags').val();


    $.ajax({
      type: 'post',
      url: '/ajax/save-share-video',
      data: {
        _token: token,
        title: title,
        ytId: ytId,
        description: description,
        thumb: thumbnail,
        tags: tags
      },
      success: function (response) {
        $('#sharevideo').modal('close');
        top.location.href = '/profile/feed/my-feed';
      }
    });
  });

  $(document).on('click', '.btnOwnerDeleteEntity', function () {
    var $this = $(this);

    var entityId = $this.attr('data-entity-id');
    var ownerId = $this.attr('data-owner-id');
    var token = $this.attr('token');

    $.ajax({
      type: 'post',
      url: '/profile/delete-entity',
      data: {
        _token: token,
        entityId: entityId,
        ownerId: ownerId
      },
      success: function () {

      }
    })
  });

  $(document).on('click', '.btnOwnerUpdateImage', function () {
    var entityId = $(this).attr('data-entity-id');
    var userId = $(this).attr('data-owner-id');
    var token = $(this).attr('token');

    $.ajax({
      type: 'post',
      url: '/profile/entity/edit',
      data: {
        entity_id: entityId,
        user_id: userId,
        _token: token
      },
      success: function (response) {
        var entity = jQuery.parseJSON(response);
        $('#updateImageTitle').val(entity.title);
        $('#updateDescriptionImage').val(entity.description);
        $('#entityUpdateImageUrl').attr('src', entity.image_url);
        $('#hdnEntityId').val(entity.id);
        if (entity.pro == 1) {
          $('#entityUpdateProOnly').attr('checked', "checked");
        }
        $('#updateimage').modal('open');
        Materialize.updateTextFields();
      }
    });

  });

  $(document).on('click', '.btnOwnerUpdatePost', function () {
    var entityId = $(this).attr('data-entity-id');
    var userId = $(this).attr('data-owner-id');
    var token = $(this).attr('token');

    $.ajax({
      type: 'post',
      url: '/profile/entity/edit',
      data: {
        entity_id: entityId,
        user_id: userId,
        _token: token
      },
      success: function (response) {
        var entity = jQuery.parseJSON(response);
        console.log(entity.id);
        $('#updatePostTitle').val(entity.title);
        $('#updatePostDescription').val(entity.description);
        $('#entityUpdatePostImageUrl').attr('src', entity.image_url);
        $('#hdnEntityPostId').val(entity.id);
        if (entity.pro == 1) {
          $('#entityUpdateProOnly').attr('checked', "checked");
        }
        $('#updatepostmodal').modal('open');
        Materialize.updateTextFields();

        initTinyMCE('updatePostDescription');
      }
    });

  });

  $(document).on('click', '.btnFollow', function () {
    var $this = $(this);

    var followerId = $this.attr('data-follower-id');
    var userId = $this.attr('data-user-id');
    var token = $this.attr('token');

    $.ajax({
      type: 'post',
      url: '/ajax/follow',
      data: {
        _token: token,
        followerId: followerId,
        followingId: userId
      },
      success: function (response) {
        var obj = JSON.parse(response);

        $this.removeClass('btnFollow').addClass('btnUnfollow');
        $this.html('Unfollow');

        if ($('.id_card_followers_' + userId).length) {
          $('.id_card_followers_' + userId).html(obj.t);
          $('.btn_follow_' + userId).removeClass('btnFollow').addClass('bntUnfollow').html('Unfollow');
        }

        if ($('#profile_followers').length) {
          $('#profile_followers').html(obj.t);
        }
      }
    });

    return false;
  });

  $(document).on('click', '.btnUnfollow', function () {
    var $this = $(this);

    var followerId = $this.attr('data-follower-id');
    var userId = $this.attr('data-user-id');
    var token = $this.attr('token');

    $.ajax({
      type: 'post',
      url: '/ajax/unfollow',
      data: {
        _token: token,
        followerId: followerId,
        followingId: userId
      },
      success: function (response) {
        var obj = JSON.parse(response);

        $this.removeClass('btnUnfollow').addClass('btnFollow');
        $this.html('Follow');

        if ($('.id_card_followers_' + userId).length) {
          $('.id_card_followers_' + userId).html(obj.t);
          $('.btn_follow_' + userId).removeClass('btnUnfollow').addClass('bntFollow').html('Follow');
        }

        if ($('#profile_followers').length) {
          $('#profile_followers').html(obj.t);
        }
      }
    });

    return false;
  });

  $(document).on('click', '#btnUserUpdateInfo', function (e) {
    e.preventDefault();
    var token = $('input[name="_token"]').val();
    var username = $('input[name="txtUsername"]').val();
    var oldUsername = $('input[name="hdnOldUsername"]').val();

    $.ajax({
      type: 'post',
      url: '/profile/check/username',
      data: {
        _token: token,
        username: username,
        oldUsername: oldUsername
      },
      success: function (data) {
        var response = JSON.parse(data);

        if (response.exists) {
          alert('Username already taken!');
        } else {
          $('#frmUpdateUserInfo').submit();
        }
      }
    })
  });

  $(document).on('click', '#btnUserUpdatePassword', function (e) {
    e.preventDefault();
    $('.error').hide();
    var noErr = true;
    var userId = $('input[name="hdnUserUpdateInfo"]').val();
    var oldPass = $('input[name="oldPass"]').val();
    var newPass = $('input[name="newPass"]').val();
    var confirmPass = $('input[name="confPass"]').val();
    var token = $('input[name="_token"]').val();

    if (newPass == '' || newPass.length < 8) {
      $('#errNewPass').show();
      noErr = false;
    }

    if (newPass != confirmPass) {
      $('#errConfPass').show();
      noErr = false;
    }

    if (noErr) {
      console.log('no errors');
      $.ajax({
        type: 'post',
        url: '/profile/update/password',
        data: {
          userId: userId,
          oldPass: oldPass,
          newPass: newPass,
          _token: token
        },
        success: function (response) {
          console.log(response);
          obj = JSON.parse(response);

          if (obj.message == 'wrong_password') {
            $('#errOldPass').show();
          } else if (obj.message == 'success') {
            alert('Password successfully updated!');
            window.location.reload(true);
          }
        }
      });
    }

    return false;
  });

  $(document).on('click', '.clickable', function () {
    var $this = $(this);
    var username = $this.attr('data-username');

    window.location = '/profile/' + username;
  });

  $(document).on('click', '.reply2comment', function (e) {
    e.preventDefault();
    var $this = $(this);

    var parentId = $this.attr('data-comment-id');
    $('#hdnParentId').val(parentId);

    $('#response').modal({
      ready: function (modal, trigger) {
        console.log('open modal');
        Dropzone.discover();
      }
    });
    $('#response').modal('open');


    //
  });

  // Reply form
  $('#frmAddCommentReply').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
      'type': 'post',
      'url': '/ajax/post-comment-reply',
      data: new FormData(this),
      beforeSend: function () {
        $('#btnSubmitCommentReply').attr('disabled', true);
        $('#replyCommentAttachment').append('<div class="progress" id="progressBar">\n' +
          '      <div class="indeterminate"></div>\n' +
          '  </div>');
      },
      contentType: false,
      processData: false,
      success: function (data) {
        removeAttachment('#replyCommentAttachment');
        $('#tabs-comments-latest').html(data);
        $('ul.tabs').tabs('select_tab', 'tabs-comments-latest');
        $('#txtReplyBody').val('');
        $('body').removeClass('openModal');
        $('#response').modal('close');
        $('#btnSubmitCommentReply').attr('disabled', false);
        $('#replyCommentAttachment>.progress').remove();
      }
    });
  });


  $(document).on('click', '#btnSubmitCommentReply', function () {
    var entityId = $('#hdnEntityId').val();
    var entityType = $('#hdnEntityType').val();
    var token = $('input[name="_token"]').val();
    var replyBody = $('#txtReplyBody').val();

    var gifUrl = $('#hdnGiphyUrlReply').val();
    var parentId = $('#hdnParentId').val();

    $('#frmAddCommentReply').submit();
    /*
            $.ajax({
                type: 'post',
                url: '/ajax/post-comment-reply',
                data: {
                    _token: token,
                    parentId: parentId,
                    entityId: entityId,
                    entityType: entityType,
                    comment: replyBody,
                    hdnGiphyUrlReply: gifUrl
                }, success: function(data){
                    removeAttachment('#replyCommentAttachment');
                    $('#tabs-comments-latest').html(data);
                    $('ul.tabs').tabs('select_tab', 'tabs-comments-latest');
                    $('#txtReplyBody').val('');
                    $('#response').modal('close');
                }
            })
    */
  });

  $(document).on('click', '.featureIt', function () {
    var entityId = $(this).attr('data-entity-id');
    var token = $(this).attr('data-token');

    $.ajax({
      type: 'post',
      url: '/backend/user/entity/feature',
      data: {
        _token: token,
        entity: entityId
      }, success: function () {
        alert('This resource is now featured! You can view it in main feed');
      }
    })
  });

  $(document).on('click', '.unfeatureIt', function () {
    var entityId = $(this).attr('data-entity-id');
    var token = $(this).attr('data-token');

    $.ajax({
      type: 'post',
      url: '/backend/user/entity/unfeature',
      data: {
        _token: token,
        entity: entityId
      }, success: function () {
        alert('This resource is now un-featured!');
      }
    })
  });

  $(document).on('click', '.deleteIt', function () {
    var entityId = $(this).attr('data-entity-id');
    var token = $(this).attr('data-token');

    $.ajax({
      type: 'post',
      url: '/backend/ajax/entity/delete',
      data: {
        entityId: entityId,
        _token: token
      },
      success: function (response) {
        window.location.reload();
      }
    });
  });

  $(document).on('click', '.moderateIt', function () {
    var entityId = $(this).attr('data-entity-id');
    var token = $(this).attr('data-token');

    console.log(entityId);

    $.ajax({
      type: 'post',
      url: '/ajax/entity/moderate',
      data: {
        entityId: entityId,
        _token: token
      },
      success: function (response) {
        window.location.reload();
      }
    });
  });

  $(document).on('click', '.deleteComment', function () {

    var commentId = $(this).attr('data-comment-id');
    var entityId = $(this).attr('data-entity-id');
    var entityType = $(this).attr('data-entity-type');
    var token = $(this).attr('data-token');

    console.log('delete comment');
    $('#modalDeleteComment').modal({
      ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        var btn = $('#btnConfirmDeleteComment');
        btn.attr('data-token', token);
        btn.attr('data-comment-id', commentId);
        btn.attr('data-entity-id', entityId);
        btn.attr('data-entity-type', entityType);
      },
    });
    $('#modalDeleteComment').modal('open');

    return false;

  });

  $(document).on('click', '#btnConfirmDeleteComment', function () {
    $('#modalDeleteComment').modal('close');
  });

  $(document).on('click', '#btnConfirmDeleteComment', function () {
    var commentId = $(this).attr('data-comment-id');
    var entityId = $(this).attr('data-entity-id');
    var entityType = $(this).attr('data-entity-type');
    var token = $(this).attr('data-token');

    $.ajax({
      type: 'post',
      url: '/ajax/delete-comment',
      data: {
        _token: token,
        commentId: commentId,
        entityId: entityId,
        entityType: entityType
      },
      success: function (data) {
        $('#tabs-comments-latest').html(data);
        $('ul.tabs').tabs('select_tab', 'tabs-comments-latest');
      }
    });
  });

  $(document).on('click', '.commentsFilter', function () {
    var $this = $(this);

    var token = $('input[name="_token"]').val();
    var entityId = $this.attr('data-entity-id');
    var entityType = $this.attr('data-entity-type');
    var filterType = $this.attr('data-filter-type');

    $.ajax({
      type: 'post',
      url: '/ajax/comments/filter',
      data: {
        _token: token,
        entityId: entityId,
        entityType: entityType,
        filterType: filterType
      },
      success: function (data) {
        var target = $this.attr('href');
        console.log(target);
        $(target).html(data);
      }
    })
  });

  $(document).on('click', '.btnSearch', function () {
    var token = $('input[name="_token"]').val();
    var q = $('input[name="txtTerm"]').val();

    $("#txtSearch").css("top", "10%");
    $(this).css("top", "5%");

    $.ajax({
      type: 'post',
      url: '/ajax/search',
      data: {
        _token: token,
        q: q
      },
      success: function (response) {
        $('#searchResults').html(response);
      }
    });

  });

  $(document).on('click', '.unread', function (e) {
    e.preventDefault();
    var notificationId = $(this).attr('data-notification-id');
    var token = $(this).attr('data-token');

    $.ajax({
      type: 'post',
      url: '/ajax/notification/mark-read',
      data: {
        _token: token,
        id: notificationId
      },
      success: function (response) {
        return false;
      },
      error: function (response) {
        console.log(response);
        return false;
      }
    });
    location.href = $(this).attr('href');
    return false;
  });

  $('.error').hide();

  $(document).on('click', '#btnSharePost', function (e) {
    $('.error').hide();
    var file = $('#postImage').val();
    var title = $('#title').val();
    var hasErr = false;

    if (!file[0]) {
      $('#errThumbnail').show();
      hasErr = true;
    }

    if (!title) {
      $('#errTitle').show();
      hasErr = true;
    }

    if (title.length == 1) {
      $('#errTitleLengthPost').show();
      hasErr = true;
    }

    if(!hasErr) {
      setTimeout(function(){
        $('#btnSharePost').prop('disabled', true);
      }, 50);
    }

    return !hasErr;
  });

  $(document).on('click', '#btnShareImage', function (e) {
    // e.preventDefault();
    $('.error').hide();
    var file = $('#shareImage').val();
    var title = $('#titleImage').val();

    var hasErr = false;

    if (!file[0]) {
      $('#errThumbnailImage').show();
      hasErr = true;
    }

    if (!title) {
      $('#errTitleImage').show();
      hasErr = true;
    }

    if (title.length == 1) {
      $('#errTitleLength').show();
      hasErr = true;
    }

    if(!hasErr) {
      setTimeout(function(){
        $('#btnShareImage').prop('disabled', true);
      }, 50);
    }

    return !hasErr;
  });

  $(document).on('click', '#btnUpdateImage', function () {
    $('.error').hide();
    var title = $('#updateImageTitle').val();
    var hasErr = false;

    if (!title) {
      $('#errTitleImage').show();
      hasErr = true;
    }

    if (title.length == 1) {
      $('#errTitleLengthPost').show();
      hasErr = true;
    }


    return !hasErr;
  });

  $(document).on('click', '#btnUpdatePost', function (e) {
    console.log('here');
    $('.error').hide();
    var title = $('#updatePostTitle').val();
    var hasErr = false;

    if (!title) {
      $('#errTitle').show();
      hasErr = true;
    }

    if (title.length == 1) {
      $('#errTitleLengthBP').show();
      hasErr = true;
    }


    return !hasErr;
  });

  $(document).on('click', '.filterTab', function () {
    var $this = $(this);
    var tab = $this.attr('data-tab');
    var token = $('input[name="_token"]').val();

    console.log(tab);

    sessionStorage.setItem("filter", tab);

    $.ajax({
      type: 'get',
      url: '/feed/filter/' + tab,
      data: {
        tab: tab,
        _token: token
      },
      success: function (response) {
        $('#homepageWrapper').html(response);
        listType = tab;
        currentPage = 1;
        canScroll = true;

        $(".dropdown-button").dropdown({
          belowOrigin: true,
          constrainWidth: false,
          hover: true
        });
      }
    })
    return false;
  });

  $('#ytImport').click(function () {
    var $this = $(this);
    var ytId = $('#videoYTId').val();
    if (ytId == '') {
      alert("You have to enter the ID");
      return false;
    }

    var token = $this.attr('token');

    $.ajax({
      type: 'post',
      url: '/backend/video/import-details',
      data: {
        _token: token,
        ytId: ytId
      },
      success: function (responseText) {
        var response = $.parseJSON(responseText);
        console.log(response);

        if (response.total >= 1) {
          $('#txtYoutubeTitle').val(response.title);
          $('#txtYoutubeDescription').val(response.description);
          $('#videoTags').val(response.tags);
          $('#videoThumb').attr('src', response.thumbnail_high.url);
          $('#hdnThumbHigh').val(response.thumbnail_high.url);
          $('#hdnThumbDefault').val(response.thumbnail_default.url);
          $('#hdnPublishedAt').val(response.publishedAt);

        } else {
          alert("No video found!");
        }
      }
    })
  });


  var btnFbLogin = $('.btnFacebookLogin');
  var fbLogin = btnFbLogin.attr('href');
  var current = window.location.href;

  fbLogin += '?next=' + current;
  btnFbLogin.attr('href', fbLogin);

  $('#hdnNext').val(current);
});

function initTinyMCE(selector) {
  tinymce.init({
    selector: '#' + selector,
    theme: 'modern',
    plugins: ['advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality emoticons paste textcolor'],
    relative_urls: false,
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tinymce.com/css/codepen.min.css'
    ],
    // enable title field in the Image dialog
    image_title: true,
    // enable automatic uploads of images represented by blob or data URIs
    automatic_uploads: true,
    // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: '/editor/image/upload',
    // here we add custom filepicker only to Image dialog
    file_picker_types: 'image',
    // and here's our custom image picker
    file_picker_callback: function (cb, value, meta) {
      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      // Note: In modern browsers input[type="file"] is functional without
      // even adding it to the DOM, but that might not be the case in some older
      // or quirky browsers like IE, so you might want to add it to the DOM
      // just in case, and visually hide it. And do not forget do remove it
      // once you do not need it anymore.
      var token = document.createElement('input');
      token.setAttribute('type', 'hidden');
      token.setAttribute('value', '{{ csrf_token() }}');
//                        token.set
//                        token.setAttribute('accept', 'image/*');

      input.onchange = function () {
        var file = this.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          // Note: Now we need to register the blob in TinyMCEs image blob
          // registry. In the next release this part hopefully won't be
          // necessary, as we are looking to handle it internally.
          var id = 'blobid' + (new Date()).getTime();
          var blobCache = tinymce.activeEditor.editorUpload.blobCache;
          var base64 = reader.result.split(',')[1];
          var blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          // call the callback and populate the Title field with the file name
          cb(blobInfo.blobUri(), {title: file.name});
        };
      };

      input.click();
    }
  });
}

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("txtSearch").focus();
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openMobile() {
  document.getElementById("mobilee").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeMobile() {
  document.getElementById("mobilee").style.width = "0%";
}
