from tastypie.resources import ModelResource
from Game.models import Level, Question, Answer
from tastypie import fields


class LevelResource(ModelResource):
    questions = fields.ToManyField('Game.api.QuestionIDResource', 'question_set', full=True)
    class Meta:
        queryset = Level.objects.all()
        resource_name = 'level'
        allowed_methods = ['get']

class QuestionIDResource(ModelResource):

    class Meta:
        queryset = Question.objects.all()
        resource_name = 'questionIDs'
        include_resource_uri = False
        allowed_methods = ['get']
        fields = ['id']

class QuestionResource(ModelResource):
    answers = fields.ToManyField('Game.api.AnswerResource', 'answer_set', related_name='entry', full=True)
    class Meta:
        queryset = Question.objects.all()
        resource_name = 'question'
        allowed_methods = ['get']

class AnswerResource(ModelResource):
    entry = fields.ToOneField(QuestionResource, 'question')
    class Meta:
        queryset = Answer.objects.all()
        resource_name = 'answers'
        allowed_methods = ['get']
