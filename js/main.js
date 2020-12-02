
$(document).ready(function () {
	setupTranslation();
});

function setupTranslation() {
	$(".lang-es").each(function () {
		$(this).css("display", "none");
	});
	$(".switch-language").click(function (event) {
		event.preventDefault();
		if ($(this).attr('id') == "show-es") {
			$(".lang-en").each(function () {
				$(this).css("display", "none");
			})
			$(".lang-es").each(function () {
				$(this).css("display", "block");
			})
		}
		else if ($(this).attr('id') == "show-en") {
			$(".lang-es").each(function () {
				$(this).css("display", "none");
			})
			$(".lang-en").each(function () {
				$(this).css("display", "block");
			})
		}
	})
}