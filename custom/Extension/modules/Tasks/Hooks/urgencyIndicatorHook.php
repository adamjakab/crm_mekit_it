<?php
/**
 * Created by Adam Jakab.
 * Date: 28/07/17
 * Time: 15.40
 *
 * @see: http://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_6.5/Module_Framework/Logic_Hooks/Introduction/
 * @see: http://support.sugarcrm.com/Documentation/Sugar_Developer/Sugar_Developer_Guide_6.5/Module_Framework/Logic_Hooks/Module_Hooks/
 *
 *
 *
 */
if (!defined('sugarEntry') || !sugarEntry)
{
    die('Not A Valid Entry Point');
}

class urgencyIndicatorHook
{
    private static $messages = [];
    
    /**
     * Factors each level is multiplied by
     * @var array
     */
    private static $factors = [1, 1, 1];
    
    /**
     * When considering days passed from start date - we are using this as an upper limit
     *
     * @var int
     */
    private static $daysToCompleteTask = 30;
    
    /**
     *
     * @param \Task     $bean
     * @param string    $event
     * @param array     $arguments
     */
    public static function execute($bean, $event, $arguments)
    {
        self::$messages = [];
        
        $indicator_1 = self::getIndicatorLevelComponent_1($bean);
        $indicator_2 = self::getIndicatorLevelComponent_2($bean);
        $indicator_3 = self::getIndicatorLevelComponent_3($bean);
        $levels = [$indicator_1, $indicator_2, $indicator_3];
    
        self::$messages[] = "LEVELS: " . json_encode($levels);
        
        $factors = self::$factors;
        self::$messages[] = "FACTORS: " . json_encode($factors);
        
        $compoundLevels = self::getCompoundIndicatorLevel($levels, $factors);
        
        $bean->urgency_indicator_c = $compoundLevels;
        $bean->urgency_calc_temp_c = implode("\n", self::$messages);
    }
    
    /**
     * @param array $levels
     *
     * @return int
     */
    protected function getCompoundIndicatorLevel($levels, $factors)
    {
        $answer = 0;
        $maxElements = count($levels);
        
        for($i = 0; $i < $maxElements; $i++)
        {
            $level = isset($levels[$i]) ? intval($levels[$i]) : 0;
            //check 0-100
            if($level < 0)
            {
                $level = 0;
            }
            if($level > 100)
            {
                $level = 100;
            }
            $factor = isset($factors[$i]) ? floatval($factors[$i]) : 0;
            //check 0-1
            if($factor < 0)
            {
                $factor = 0;
            }
            if($factor > 1)
            {
                $factor = 1;
            }
            $factoredLevel = $factor * $level;
            
            self::$messages[] = "Factored Level[$i]: " . $factoredLevel;
            
            $answer += $factoredLevel;
        }
        
        self::$messages[] = "Factored Level Sum: " . $answer;
    
        $answer = round($answer / $maxElements);
        self::$messages[] = "URGENCY LEVEL: " . $answer;
        
        
        return $answer;
    }
    
    /**
     * Componente 1 - Data inizio
     * //@todo: implement logarithmic formula for this
     *
     * @param \Task $bean
     *
     * @return int
     */
    protected function getIndicatorLevelComponent_1(\Task $bean)
    {
        $answer = 0;
        
        $start_date = $bean->date_start;//2017-08-07 06:00:00
        
        if($start_date) {
            $today = new \DateTime();
            $startDateTimestamp = strtotime($start_date);
            $todayTimestamp = $today->format("U");
            $secondsFromStart = $todayTimestamp - $startDateTimestamp;
            $daysFromStart = round($secondsFromStart / 60 / 60 / 24);
            $daysFromStart = $daysFromStart < 0 ? 0 : $daysFromStart;
            
            //simple(linear) weighted level - $daysToCompleteTask
            $answer = round(100 * $daysFromStart / self::$daysToCompleteTask);
     
            self::$messages[] = "1 - START DATE LEVEL[DIFF:$daysFromStart / MAX: "
                . self::$daysToCompleteTask . "]: " . $answer;
        }
        
        return $answer;
    }
    
    /**
     * Componente 2 - Data scadenza
     *
     * //@todo: implement logarithmic formula for this - control curvature - strech horizontally
     *
     * @param \Task $bean
     *
     * @return int
     */
    protected function getIndicatorLevelComponent_2(\Task $bean)
    {
        $answer = 0;
    
        $due_date = $bean->date_due;//2017-08-07 06:00:00
    
        if($due_date) {
            $today = new \DateTime();
            $dueDateTimestamp = strtotime($due_date);
            $todayTimestamp = $today->format("U");
            $secondsToDeadline = $dueDateTimestamp - $todayTimestamp;
            $daysToDeadline = round($secondsToDeadline / 60 / 60 / 24);
            $daysToDeadline = $daysToDeadline < 0 ? 0 : $daysToDeadline;
        
            //simple(linear) weighted level
            $answer = round(100 / ($daysToDeadline + 1));
        
            self::$messages[] = "2 - DUE DATE LEVEL[DIFF:$daysToDeadline]: " . $answer;
        }
    
        return $answer;
    }
    
    /**
     * Componente 3 - Priorità
     *
     * @param \Task $bean
     *
     * @return int
     */
    protected function getIndicatorLevelComponent_3(\Task $bean)
    {
        $priorityLevels = [
            'P1' => 100, /*urgente*/
            'P2' => 75, /*alta*/
            'P3' => 50, /*media*/
            'P4' => 25, /*bassa*/
        ];
        
        $priority = $bean->priority;
        
        $answer = array_key_exists($priority, $priorityLevels) ? $priorityLevels[$priority] : 0;
        
        self::$messages[] = "3 - PRIORITY LEVEL[$priority]: $answer";
        
        return $answer;
    }
}


