<?php

namespace Algolia\AlgoliaSearch\Cache;

use Psr\SimpleCache\CacheInterface;

final class FileCacheDriver implements CacheInterface
{
    const PREFIX = 'algolia-client-';

    private $directory;

    public function __construct($directory)
    {
        $this->directory = rtrim($directory, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
    }

    /**
     * @inheritdoc
     */
    public function get($key, $default = null)
    {
        if (!$this->has($key)) {
            return $default;
        }

        return file_get_contents($this->getFilenameFromKey($key));
    }

    /**
     * @inheritdoc
     */
    public function set($key, $value, $ttl = null)
    {
        return file_put_contents($this->getFilenameFromKey($key), $value);
    }

    /**
     * @inheritdoc
     */
    public function delete($key)
    {
        return @unlink($this->getFilenameFromKey($key));
    }

    /**
     * @inheritdoc
     */
    public function clear()
    {
        $result = true;
        foreach (glob($this->directory.self::PREFIX.'*') as $file) {
            $result &= @unlink($file);
        }

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function getMultiple($keys, $default = null)
    {
        $result = [];
        foreach ($keys as $key) {
            $result[$key] = $this->get($key, $default);
        }

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function setMultiple($values, $ttl = null)
    {
        $result = true;
        foreach ($values as $key => $value) {
            $result &= $this->set($key, $value, $ttl);
        }

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function deleteMultiple($keys)
    {
        $result = true;
        foreach ($keys as $key) {
            $result &= $this->delete($key);
        }

        return $result;
    }

    /**
     * @inheritdoc
     */
    public function has($key)
    {
        return file_exists($this->getFilenameFromKey($key));
    }

    /**
     * @param string $key
     *
     * @return string
     */
    private function getFilenameFromKey($key)
    {
        $name = $this->directory.self::PREFIX.$key;

        return str_replace('\\', '-', $name);
    }
}
