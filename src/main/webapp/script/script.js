$(document).ready(function () {
    const table = $("#my-table");
    const tableBody = $("#t-body");
    const dropDown = $("#my-dropdown");
    const pageNumber = $("#page-number");

    function renderTable(pageSize, pageNumber) {
        $.get("/rest/players/?pageNumber=0&pageSize=5", function (data) {
            $.each(data, function (i, member) {
                const row = `<tr>
                    <td>${i + 1}</td>
                    <td>${member.name}</td>
                    <td>${member.title}</td>
                    <td>${member.race}</td>
                    <td>${member.profession}</td>
                    <td>${member.level}</td>
                    <td>${member.birthday}</td>
                    <td>${member.banned}</td>
                    </tr>`;
                table.append(row);
            });
        });
    }

    function renderPaginationButtons() {
        $.get('/rest/players/count', function (data) {
            let pageSize = dropDown.val();
            let chunk = Math.ceil(data / pageSize);
            pageNumber.empty();
            for (let i = 1; i <= chunk; i++) {
                let button = $('<button>' + i + '</button>');
                pageNumber.append(button);
                button.attr('id', 'b-num');
                button.attr('value', i);
            }
        });
    }

    renderTable(5, 0);
    renderPaginationButtons();


    dropDown.click(() => {

        let pageSize = dropDown.val();

        $.get('/rest/players/?pageNumber=0&pageSize=' + pageSize + '', function (data) {
            tableBody.empty();
            $.each(data, function (i, members) {
                const row = $("<tr><td>" + (i + 1) + "</td><td>" + members.name + "</td><td>" + members.title + "</td><td>" + members.race + "</td><td>" + members.profession + "</td><td>" + members.level + "</td><td>" + members.birthday + "</td><td>" + members.banned + "</td></tr>");
                table.append(row);
            });
        });

        $.get('/rest/players/count', function (data) {
            let chunk = Math.ceil(data / pageSize);
            pageNumber.empty();
            for (let i = 1; i <= chunk; i++) {
                let button = $('<button>' + i + '</button>');
                pageNumber.append(button);
                button.attr('id', 'b-num');
                button.attr('value', i);
            }
        });
    });

    pageNumber.on('click', 'button', function () {
        let pageSize = dropDown.val();
        let pageNumber = $(this).val() - 1;
        $.get('/rest/players/?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '', function (data) {
            tableBody.empty();
            $.each(data, function (i, members) {
                const row = $("<tr><td>" + (i + data[0].id) + "</td><td>" + members.name + "</td><td>" + members.title + "</td><td>" + members.race + "</td><td>" + members.profession + "</td><td>" + members.level + "</td><td>" + members.birthday + "</td><td>" + members.banned + "</td></tr>");
                table.append(row);
            });
        });
    });
});
