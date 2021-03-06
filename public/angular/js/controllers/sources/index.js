angular.module('Aggie')

.controller('SourcesIndexController', [
  '$scope',
  '$rootScope',
  'FlashService',
  'sources',
  'Source',
  'Tags',
  'Socket',
  function($scope, $rootScope, flash, sources, Source, Tags, Socket) {
    $scope.sources = sources;
    var init = function() {
      Socket.on('stats', updateStats);
      Socket.join('stats');
    };

    var updateStats = function(stats) {
      $scope.stats = stats;
    };

    $scope.saveSource = function(source) {
      Source.save({ id: source._id }, source, function() {
      }, function() {
        flash.setAlertNow('source.save.error');
        source.enabled = !source.enabled;
      });
    };

    $scope.target = function(source) {
      return source.media == 'twitter' || source.media == 'smsgh' || source.media == 'whatsapp' || source.media == 'crowdtangle' ? source.keywords : source.url;
    };

    $scope.sourceClass = function(source) {

      var mediaOptions = ['twitter', 'rss', 'elmo', 'smsgh', 'whatsapp', 'crowdtangle'];

      if (mediaOptions.indexOf(source.media) !== -1) {
        return source.media + '-source';
      } else {
        return 'unknown-source';
      }
    };

    $scope.viewSource = function(event, source) {
      $rootScope.$state.go('source', { id: source._id });
    }
    $scope.$on('$destroy', function() {
      Socket.leave('stats');
      Socket.removeAllListeners('stats');
    });

    $scope.tagsToString = Tags.tagsToString;

    $scope.$on('$destroy', function() {
      Socket.leave('stats');
      Socket.removeAllListeners('stats');
    });
    init();
  }
]);
