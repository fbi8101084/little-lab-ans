(function ($) {
    function DomMaker() {}
    DomMaker.prototype.init = function (base, names, images) {
        var _this = this,
            $table = '',
            rows = _this.tr('<th>成品</th><th colspan="10">材料</th>');

        _this.base = base;
        _this.names = names;
        _this.images = images;

        $table += rows;

        for (var p in base) {
            var row = _this.item(p);

            if (base[p].parents) {
                var pTable = '';
                $.each(base[p].parents, function (i, ans) {
                    var ptr = '';
                    $.each(ans, function (i, itemIndex) {
                        ptr += _this.item(itemIndex);
                    });

                    pTable += _this.tr(ptr);
                });
                row += _this.td(_this.table(pTable));
            } else {
                row += _this.td('這已經是最上層元素了');
            }
            $table += _this.tr(row, 'item-' + p);
        }
        return _this.table($table);
    };

    DomMaker.prototype.item = function (index) {
        var img = '<img src="data:image/png;base64,' + this.images[index] + '"/>',
            span = '<span><a href="#item-' + index + '">' + this.names[index] + '</a></span>';

        return this.td(img + '<br/>' + span);
    };

    DomMaker.prototype.table = function (text) {
        return '<table class="table table-striped table-bordered">' + text + '</table>';
    };
    DomMaker.prototype.tr = function (text, id) {
        return '<tr id="' + id + '">' + text + '</tr>';
    };
    DomMaker.prototype.th = function (text) {
        return '<th>' + text + '</th>';
    };
    DomMaker.prototype.td = function (text) {
        return '<td>' + text + '</td>';
    };

    var domMaker = new DomMaker();
    $(function () {
        $.when($.getJSON('json/base.550a.json'),
            $.getJSON('json/names.550a.json'),
            $.getJSON('json/images.550a.json'))
            .done(function (a, b, c) {
                var base   = a[0],
                    names  = b[0],
                    images = c[0];

                $('body').html(domMaker.init(base, names, images));
            });
    });
})(jQuery);