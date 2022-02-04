<?php

namespace Algolia\AlgoliaSearch\RetryStrategy;

use Algolia\AlgoliaSearch\Algolia;

/**
 * @internal
 */
final class ClusterHosts
{
    private $read;

    private $write;

    private $cacheKey;

    private $lastReadHash;

    private $lastWriteHash;

    public function __construct(HostCollection $read, HostCollection $write)
    {
        $this->read = $read;
        $this->write = $write;
    }

    public static function create($read, $write = null)
    {
        if (null === $write) {
            $write = $read;
        }

        if (is_string($read)) {
            $read = [$read => 0];
        }

        if (is_string($write)) {
            $write = [$write => 0];
        }

        if (array_values($read) === $read) {
            $read = array_fill_keys($read, 0);
        }

        if (array_values($write) === $write) {
            $write = array_fill_keys($write, 0);
        }

        return new static(HostCollection::create($read), HostCollection::create($write));
    }

    public static function createFromAppId($applicationId)
    {
        $read = $write = [
            $applicationId.'-1.algolianet.com' => 0,
            $applicationId.'-2.algolianet.com' => 0,
            $applicationId.'-3.algolianet.com' => 0,
        ];

        $read[$applicationId.'-dsn.algolia.net'] = 10;
        $write[$applicationId.'.algolia.net'] = 10;

        return static::create($read, $write);
    }

    public static function createForAnalytics($region)
    {
        return static::create('analytics.'.$region.'.algolia.com');
    }

    public static function createForInsights($region)
    {
        return static::create('insights.'.$region.'.algolia.io');
    }

    public static function createForRecommendation($region)
    {
        return static::create('recommendation.'.$region.'.algolia.com');
    }

    public static function createForQuerySuggestions($region)
    {
        return static::create('query-suggestions.'.$region.'.algolia.com');
    }

    public static function createFromCache($cacheKey)
    {
        if (!Algolia::isCacheEnabled()) {
            return false;
        }

        if (!Algolia::getCache()->has($cacheKey)) {
            return false;
        }

        return @unserialize(Algolia::getCache()->get($cacheKey));
    }

    public function read()
    {
        return $this->getUrls('read');
    }

    public function write()
    {
        return $this->getUrls('write');
    }

    public function failed($host)
    {
        $this->read->markAsDown($host);
        $this->write->markAsDown($host);

        $this->updateCache();

        return $this;
    }

    public function reset()
    {
        $this->read->reset();
        $this->write->reset();

        return $this;
    }

    public function shuffle()
    {
        $this->read->shuffle();
        $this->write->shuffle();

        return $this;
    }

    /**
     * Sets the cache key to save the state of the ClusterHosts.
     *
     * @param string $cacheKey
     *
     * @return $this
     */
    public function setCacheKey($cacheKey)
    {
        $this->cacheKey = $cacheKey;

        return $this;
    }

    private function getUrls($type)
    {
        $urls = $this->{$type}->getUrls();
        $lashHashName = 'last'.ucfirst($type).'Hash';

        if (Algolia::isCacheEnabled()) {
            $hash = sha1(implode('-', $urls));
            if ($hash !== $this->{$lashHashName}) {
                $this->updateCache();
            }
            $this->{$lashHashName} = $hash;
        }

        return $urls;
    }

    private function updateCache()
    {
        if (null !== $this->cacheKey && Algolia::isCacheEnabled()) {
            Algolia::getCache()->set($this->cacheKey, serialize($this));
        }
    }
}
