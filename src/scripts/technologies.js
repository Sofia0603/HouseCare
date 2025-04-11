const technologies = [
    {
        ellipse: $('#technology__ellipse-1'),
        name: 'Неразрывный каркас',
        description: 'Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.'
    },
    {
        ellipse: $('#technology__ellipse-2'),
        name: 'Диагональный раскос',
        description: 'Система диагональных раскосов позволяет создать оптимальный вентиляционный зазор для капитальных стен и наружной отделки'
    },
    {
        ellipse: $('#technology__ellipse-3'),
        name: 'Сборка силовых узлов',
        description: 'Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции'
    },
    {
        ellipse: $('#technology__ellipse-4'),
        name:'Плитная ветрозащита',
        description: 'Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен'
    },
    {
        ellipse: $('#technology__ellipse-5'),
        name:'5 камерные окна',
        description: 'Обеспечивает исключительную сохранность тепла в доме'
    }
]
$(window).resize(function () {

    if ($(window).width() <= 1170) {


        function handleEllipseClick(event) {
            console.log(event.target.parentElement.parentElement.parentElement);
            const clickedTechnology = technologies.find(tech => tech.ellipse.is(event.target.parentElement.parentElement.parentElement));

            if (clickedTechnology) {
                $('.technologies__card').css('display', 'block  ');
                $('.technologies__card .technology__title').text(clickedTechnology.name); // Заголовок
                $('.technologies__card .technology__text').text(clickedTechnology.description); // Описание
            }
        }

        $(document).on('click', handleEllipseClick);


    } else {
        $('.technologies__card').css('display', 'none');
        $('#technology__ellipse-1').off('click');
        $('#technology__ellipse-2').off('click');
        $('#technology__ellipse-3').off('click');
        $('#technology__ellipse-4').off('click');
        $('#technology__ellipse-5').off('click');


    }


}).trigger('resize');





