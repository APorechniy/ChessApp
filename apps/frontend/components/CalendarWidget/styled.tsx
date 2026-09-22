import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    height: 36rem;

    box-sizing: border-box;
    padding: 0.8rem;

    position: sticky;
    top: 0;

    border: 0.1rem solid var(--primary-btn-color);
    border-radius: 0.8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    /* Navigation Styles */
    .react-calendar__navigation {
        height: 5rem;
        display: flex;

        .react-calendar__navigation__label {
            font-weight: bold;
            font-size: 1.4rem;
            background: none;

            border-radius: 0.8rem;

            &:hover {
                background-color: var(--primary-btn-color);
                color: var(--primary-text-inverted);
            }
        }

        .react-calendar__navigation__arrow {
            flex-grow: 0.333;
            background: none;

            border-radius: 0.8rem;
            font-size: 2rem;

            &:hover {
                background-color: var(--primary-btn-color);
                color: var(--primary-text-inverted);
            }
        }
    }

    /* Days Grid Styles */
    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: repeat(7, 14.2%); 
        align-items: center;
        row-gap: 0.8rem;

        .react-calendar__tile {
            max-width: initial !important;
        }
    }

    /* Day Styles */
    .react-calendar__month-view__days__day {
        border-radius: 0.8rem;
        height: 3.6rem;

        font-size: 1.4rem;
        color: var(--primary-text-light);
        background: none;

        box-sizing: border-box;
        margin: 0.4rem;
    }

    button {
        &:hover {
            background-color: var(--primary-btn-color);
            color: var(--primary-text-inverted);
        }
    }

    /* Active Day Styles */
    .react-calendar__tile--range {
        background-color: var(--primary-btn-color);
        color: var(--primary-text-inverted);
        font-size: 1.4rem;
    }

    /* Label Styles */
    .react-calendar__month-view__weekdays {
        height: 3.6rem;
        display: grid !important;
        grid-template-columns: repeat(7, 14.2%); 
        text-align: center;

        font-size: 1.4rem;
        color: var(--primary-text-light);

        margin-bottom: 1rem;

        abbr {
            text-decoration: none;
        }
    }

    /* Other View Styles */
    .react-calendar__year-view__months, 
    .react-calendar__decade-view__years, 
    .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: 20% 20% 20% 20% 20%;

        &.react-calendar__year-view__months {
            grid-template-columns: 33.3% 33.3% 33.3%;
        }

        .react-calendar__tile {
            height: 4rem;
            box-sizing: border-box;
            margin: 1rem;
            max-width: initial !important;

            border-radius: 0.5rem;

            font-size: 1.4rem;
            color: var(--primary-text-light);
            background: none;

            &:hover {
                background-color: var(--primary-btn-color);
                color: var(--primary-text-inverted);
            }
        }
    }
  }
`