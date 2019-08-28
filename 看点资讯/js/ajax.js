  var url = 'http://134.175.154.93:8099/'
  findAllCategory()
  // 显示所有 
  function findAllCategory() {
      $.get(url + "manager/category/findAllCategory",
          function (res) {
              console.log(res);
              var str = '';
              // console.log(JSON.parse(res).data);
              var data = $(res.data);
              data.each(function (index, item) {
                  if (item.parent != null) {
                      str += `
                            <tr>
                                <td><input type="checkbox"> </td>
                                <td>` + item.name + `</td>
                                <td>` + item.parent.name + `</td>
                                <td>` + item.comment + `</td>
                                <td> 
                                <button class = "update" data-id = "` + item.id + `" > 修改 </button>
                                <button class = "delete" data-id = "` + item.id + `" > 删除 </button>
                                </td>
                            </tr>
                `;
                  } else {
                      str += `
                            <tr>
                                <td><input type="checkbox"> </td>
                                <td>` + item.name + `</td>
                                <td>-</td>
                                <td>` + item.comment + `</td>
                                <td> 
                                <button class = "update" data-id = "` + item.id + `" > 修改 </button>
                                <button class = "delete" data-id = "` + item.id + `" > 删除 </button>
                                </td>
                            </tr>
                `;
                  }

              });
              $('#category-msg').html(str);
          }
      );
  }
  // 增加
  function saveOrUpdateCategory(obj) {
      $.post(url + 'manager/category/saveOrUpdateCategory', obj,
          function () {
              findAllCategory()
          },
      );
  }
  // 删除
  function deleteCategoryById(id) {
      $.get(url + 'manager/category/deleteCategoryById?id=' + id,
          function () {
              findAllCategory();
          }
      );
  }
  // 批量删除
  function batchDeleteCategory(ids) {
      $.post(url + 'manager/category/batchDeleteCategory', ids,
          function () {
              findAllCategory()
          },
      );
  }
  // 修改

  // 修改 删除代理
  $('.update').click(function () {

  })
  $('#category-msg').on('click', '.delete', function (e) {
      console.log($(this).data("id"))
      deleteCategoryById($(this).data("id"))
  })