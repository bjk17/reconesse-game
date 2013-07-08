from tastypie.resources import ModelResource
from Game.models import Level, Question, Answer
from tastypie import fields


class LevelResource(ModelResource):
    class Meta:
        queryset = Level.objects.all()
        resource_name = 'level'


class QuestionResource(ModelResource):
    answers = fields.ToManyField('Game.api.AnswerResource', 'answer_set', related_name='entry', full=True)
    class Meta:
        queryset = Question.objects.all()
        resource_name = 'question'


class AnswerResource(ModelResource):
    entry = fields.ToOneField(QuestionResource, 'question')
    class Meta:
        queryset = Answer.objects.all()
        resource_name = 'answers'

