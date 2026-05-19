<?php

use Ucscode\HtmlComponent\TableGenerator\Abstraction\AbstractMiddleware;
use Ucscode\HtmlComponent\TableGenerator\Component\Section\Tr;
use Ucscode\HtmlComponent\TableGenerator\Component\Tbody;
use Ucscode\HtmlComponent\TableGenerator\Contracts\CellInterface;
use Ucscode\HtmlComponent\TableGenerator\Contracts\TableSegmentInterface;
use Ucscode\HtmlComponent\TableGenerator\Table;

class BootstrapDesignMiddleware extends AbstractMiddleware
{
    public function process(Table $table): Table
    {
        $table->getAttributes()->set('class', 'table table-striped table-bordered table-hover');

        $table->getThead()->getAttributes()->set('class', 'sortable');

        $this->iterateCellsIn($table, function (CellInterface $cell, Tr $tr, TableSegmentInterface $segment) {
            $cell->getAttributes()->set(
                'scope',
                $segment instanceof Tbody ? 'col' : 'row'
            );
        });

        return $table;
    }
}
