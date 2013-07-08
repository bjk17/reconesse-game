from django.conf.urls import patterns, include, url
from Game.api import LevelResource, QuestionResource

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()
level_resource = LevelResource()
question_resource = QuestionResource()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ReconesseGame.views.home', name='home'),
    # url(r'^ReconesseGame/', include('ReconesseGame.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/',include(level_resource.urls)),
    url(r'^api/',include(question_resource.urls)),
)
