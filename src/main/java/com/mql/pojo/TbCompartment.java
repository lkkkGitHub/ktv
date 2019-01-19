package com.mql.pojo;

/**
 * @author mql
 * @date 2018/1/13
 */
public class TbCompartment {

    private String compartmentId;
    private String compartmentName;
    private String stateForenoon;
    private String stateAfternoon;
    private String stateEvening;
    private Integer state;

    /**
     * 上午，下午，晚上的状态
     */
    private String allState;

    public String getAllState() {
        return allState;
    }

    public void setAllState(String allState) {
        this.allState = allState;
    }

    public String getCompartmentId() {
        return compartmentId;
    }

    public void setCompartmentId(String compartmentId) {
        this.compartmentId = compartmentId;
    }


    public String getCompartmentName() {
        return compartmentName;
    }

    public void setCompartmentName(String compartmentName) {
        this.compartmentName = compartmentName;
    }


    public String getStateForenoon() {
        return stateForenoon;
    }

    public void setStateForenoon(String stateForenoon) {
        this.stateForenoon = stateForenoon;
    }


    public String getStateAfternoon() {
        return stateAfternoon;
    }

    public void setStateAfternoon(String stateAfternoon) {
        this.stateAfternoon = stateAfternoon;
    }


    public String getStateEvening() {
        return stateEvening;
    }

    public void setStateEvening(String stateEvening) {
        this.stateEvening = stateEvening;
    }


    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

}
