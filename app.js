var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Where does Jamal live?",
			options: ["Canyon", "Amarillo", "Hereford", "A Dumpstar"],
			answer: 0
		},
		{
			question: "When did the Gulf War Begin?",
			options: ["1990", "1956", "1973", "1985"],
			answer: 0
		},
		{
			question: "What does Dr. Babb want to be?",
			options: ["Wizard", "President", "Dean", "Emperor"],
			answer: 3
		},
		{
			question: "Which country will the next World Cup be held in?",
			options: ["Russia", "Spain", "Brazil", "Qatar"],
			answer: 0
		},
		{	
			question: "Who is Ohm's Law?",
			options: ["I = S*R", "V = I*R", "R = V*A", "S = I*R"],
			answer: 1
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});