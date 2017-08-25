import React from 'react';
import ReactDOM from 'react-dom';
import {Game, Player} from './risk/game.js';
import './index.css';
import {RENDER_DATA} from './risk/data.js';
import paths from './map.js';

const players = [new Player('Olov'), new Player('Sven')];
var game = new Game(players, {startTroops: [24, 35, 30, 25, 20]});

function Territory(props) {
  let terr;
  for (const territory of RENDER_DATA) {
    if (territory.name === props.id) {
      terr = territory;
      break;
    }
  }
  let className = 'territory';
  if (props.disabled) {
    className += ' disabled';
  }
  if (props.active) {
    className += ' active';
  }
  if (props.standalone) {
    return terr.element;
  }
  return (
    <g onClick={props.onClick}  className={className}>
      <svg x={terr.position.x} y={terr.position.y}>
        {terr.element.props.children}
      </svg>
      <text x={terr.textPosition.x} y={terr.textPosition.y} dominantBaseline="central" textAnchor="middle">
        {props.troops}
      </text>
    </g>
  );
}

class Board extends React.Component {
  render() {
    const territories = RENDER_DATA.map((territory) => {
      if (!this.props.territories.has(territory.name)) {
        return (
          <g key={territory.name} className="territory unaccessable">
            <svg x={territory.position.x} y={territory.position.y}>
              {territory.element.props.children}
            </svg>
          </g>
        );
      } else {
        const objTerritory = this.props.territories.get(territory.name);
        const disabled = !this.props.clickable.has(objTerritory);
        let clickFunc;
        if (disabled) {
          clickFunc = () => {};
        } else {
          clickFunc = () => this.props.territoryClick(objTerritory);
        }
        return (
          <Territory
            id={objTerritory.name}
            key={objTerritory.name}
            onClick={clickFunc}
            owner={objTerritory.owner && objTerritory.owner.name}
            troops={objTerritory.troops}
            disabled={disabled}
            active={this.props.active === objTerritory}
          />
        );
      }
    });
    return (
      <svg className="board" viewBox="0 0 1191 791">
        <defs>
          <pattern id="sea-border" width="1" height="2.5" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" height=".6" width="100%"/>
          </pattern>
          <clipPath id="frame-border">
            <rect x="10" y="10" width="1171" height="771"/>
          </clipPath>
        </defs>
        <svg x="5" y="5" className="border-background">
          {paths}
        </svg>
        <g className="map-lines">
          <g className="latitudes">
            <line className="h" x1="10" y1="645.5" x2="1181" y2="645.5"/>
            <line className="h" x1="10" y1="45.5" x2="1181" y2="45.5"/>
            <line className="h" x1="10" y1="145.5" x2="1181" y2="145.5"/>
            <line className="h" x1="10" y1="245.5" x2="1181" y2="245.5"/>
            <line className="h" x1="10" y1="345.5" x2="1181" y2="345.5"/>
            <line className="h" x1="10" y1="445.5" x2="1181" y2="445.5"/>
            <line className="h" x1="10" y1="545.5" x2="1181" y2="545.5"/>
            <line className="h" x1="10" y1="745.5" x2="1181" y2="745.5"/>
          </g>
          <g className="longitudes">
            <line className="middle-line" x1="595.5" y1="10" x2="595.5" y2="781"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="100" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="600" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="500" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="400" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="300" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="200" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="700" ry="490"/>
            <ellipse className="h" cx="595.5" cy="395.5" rx="800" ry="490"/>
          </g>
        </g>
        {territories}
        <g className="connecting-lines">
          <line className="d" x1="425.25" y1="477.21" x2="473.27" y2="443.22"/>
          <line className="d" x1="738.03" y1="628.17" x2="702.95" y2="586.91"/>
          <line className="d" x1="712.17" y1="681.17" x2="686.89" y2="681.2"/>
          <line className="d" x1="1018.44" y1="512.75" x2="996" y2="482.68"/>
          <line className="d" x1="1053.69" y1="537.41" x2="1080.38" y2="550.25"/>
          <line className="d" x1="1087.99" y1="558.94" x2="1054.75" y2="608.75"/>
          <line className="d" x1="1012.92" y1="586" x2="1021.81" y2="638.56"/>
          <line className="d" x1="1113.75" y1="579.56" x2="1102.88" y2="620.81"/>
          <line className="d" x1="1039.82" y1="300.55" x2="1080.64" y2="316.68"/>
          <line className="d" x1="1086.19" y1="299.08" x2="1055.06" y2="279.57"/>
          <line className="d" x1="550.69" y1="306.21" x2="567.62" y2="344.63"/>
          <line className="d" x1="578.83" y1="343.79" x2="588.88" y2="317.92"/>
          <line className="d" x1="600.6" y1="339.51" x2="620.5" y2="369.72"/>
          <line className="d" x1="636.42" y1="355.42" x2="680.95" y2="370.47"/>
          <line className="d" x1="516.52" y1="303.99" x2="506" y2="256.44"/>
          <line className="d" x1="533.27" y1="221.87" x2="561.3" y2="242.54"/>
          <line className="d" x1="561.42" y1="209.92" x2="538.92" y2="216.58"/>
          <line className="d" x1="512.67" y1="171.94" x2="551.73" y2="189.33"/>
          <line className="d" x1="526.94" y1="207.81" x2="511.5" y2="172.03"/>
          <line className="d" x1="509.8" y1="156.62" x2="507.67" y2="132.67"/>
          <line className="d" x1="410.92" y1="173" x2="399.75" y2="181.59"/>
          <line className="d" x1="406.18" y1="106.67" x2="292.5" y2="194.34"/>
          <line className="d" x1="402.92" y1="99.92" x2="267.89" y2="135.47"/>
          <line className="d" x1="115.06" y1="179" x2="0" y2="179"/>
          <line className="d" x1="1108.55" y1="179" x2="1191" y2="179"/>
        </g>
      </svg>
    );
  }
}

class Movement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      troops: props.min,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.troops > nextProps.max) {
      this.setState({
        troops: nextProps.max,
      });
    } else if (this.state.troops < nextProps.min) {
      this.setState({
        troops: nextProps.min,
      });
    }
  }
  handleChange(event) {
    this.setState({
      troops: parseInt(event.target.value, 10),
    });
  }
  render() {
    let active, target;
    if (typeof this.props.active !== 'undefined' && this.props.active !== null) {
      active = (
        <svg width="200" height="200">
          <Territory
            id={this.props.active.name}
            standalone={true}
          />
        </svg>
      );
    }
    if (typeof this.props.target !== 'undefined' && this.props.target !== null) {
      target = (
        <svg width="200" height="200">
          <Territory
            id={this.props.target.name}
            standalone={true}
          />
        </svg>
      )
    }
    let submitText;
    switch (this.props.moveType) {
      case 'attack':
        submitText = 'Fight';
        break;
      case 'move':
        submitText = 'Move';
        break;
      default:
        submitText = 'Action';
        break;
    }
    return (
      <div>
        {active}
        <input type="number" value={this.state.troops} min={this.props.min} max={this.props.max} onChange={this.handleChange}/>
        <button onClick={() => this.props.onSubmit(this.state.troops)} disabled={this.props.active === null || this.props.target === null}>{submitText}</button>
        {target}
      </div>
    );
  }
}

class Risk extends React.Component {
  constructor() {
    super();
    this.game = game;
    this.placeTroops = this.placeTroops.bind(this);
    this.fight = this.fight.bind(this);
    this.moveTroops = this.moveTroops.bind(this);
    this.endRound = this.endRound.bind(this);
    this.endAttacking = this.endAttacking.bind(this);
    this.handleTerritoryClick = this.handleTerritoryClick.bind(this);
    this.handleMovementClick = this.handleMovementClick.bind(this);

    this.state = {
      territories: this.game.getTerritories(),
      phase: this.game.getPhase(),
      player: this.game.getCurrentPlayer(),
      clickable: new Set(this.game.getCurrentPlayer().territories),
      active: null,
      target: null,
    };
  }
  placeTroops(territory) {
    this.game.placeTroops(territory);
    const territories = this.game.getTerritories();
    const player = this.game.getCurrentPlayer();
    this.setState({
      territories: territories,
      phase: this.game.getPhase(),
      player: player,
      clickable: new Set(player.territories),
    });
  }

  fight(attacker, defender, attTroops, defTroops) {
    this.battlefield = this.game.fight(attacker, defender, attTroops, defTroops);
    this.setState({
      territories: this.game.getTerritories(),
      phase: this.game.getPhase(),
    });
    if (attacker.troops === 1) {
      this.resetMovement();
    }
  }

  moveTroops(troops) {
    const success = this.game.move(troops);
    if (success) {
      this.post('round.attack.move');
    }
  }
  retreat(from, to, troops) {
    if (this.game.retreat(from, to, troops)) {
      this.resetMovement();
      this.setState({
        territories: this.game.getTerritories(),
      });
      this.preNextRound();
    }
  }
  endAttacking() {
    this.game.endAttacking();
    this.pre('round.retreat');
  }
  endRound() {
    this.game.endAttacking(false);
    this.preNextRound();
  }
  preNextRound() {
    const player = this.game.getCurrentPlayer();
    this.setState({
      player: player,
      phase: this.game.getPhase(),
      clickable: new Set(player.territories),
      active: null,
    });
  }
  setActive(territory) {
    if (territory === null) {
      this.setState({
        active: null,
        clickable: new Set(this.state.player.territories),
      });
    } else {
      this.setState({
        active: territory,
        clickable: new Set(territory.neighbors.filter((terr) => {
          return terr.owner !== territory.owner
        }).concat([territory])),
      });
    }
  }
  resetMovement() {
    this.setState({
      active: null,
      target: null,
      clickable: new Set(this.state.player.territories),
    })
  }
  pre(phase) {
    this.setState({
      phase: this.game.getPhase(),
    });
    switch (phase) {
      case 'round.retreat':
        this.setState({
          clickable: new Set(this.state.player.territories.filter((territory) => {
            return territory.troops > 1;
          })),
          active: null,
        });
    }
  }
  post(phase) {
    this.setState({
      phase: this.game.getPhase(),
    });
    switch (phase) {
      case 'round.attack.move':
        this.setState({
          clickable: new Set(this.state.player.territories),
          territories: this.game.getTerritories(),
          phase: this.game.getPhase(),
        });
        this.resetMovement();
        break;
    }
  }
  handleTerritoryClick(territory) {
    if (territory === this.state.active && this.state.phase !== 'round.attack.move') {
      this.resetMovement();
      return;
    }
    switch(this.state.phase) {
      case 'supply.supply':
      case 'round.supply':
        this.placeTroops(territory);
        break;
      case 'round.attack':
        if (this.state.active === null) {
          this.setActive(territory);
        } else if (this.state.active === territory) {
          this.setActive(null);
        } else if (this.state.target === territory) {
          this.setState({
            target: null,
          });
        } else {
          this.setState({
            target: territory,
          });
        }
        break;
      case 'round.retreat':
        if (this.state.active === null) {
          this.setActive(territory);
          this.setState({
            clickable: new Set(this.state.player.territories.filter((terr) => {
              return terr.isLinkedWith(territory);
            })),
          });
        } else if (this.state.active === territory) {
          this.setActive(null);
        } else if (this.state.target === territory) {
          this.setState({
            target: null,
          });
        } else {
          this.setState({
            target: territory,
          });
        }
        break;
      default:
        console.warn('No action made');
        break;
    }
  }
  handleMovementClick(troops) {
    switch (this.state.phase) {
      case 'round.attack':
        const defTroops = Math.min(2, this.state.target.troops);
        this.fight(this.state.active, this.state.target, troops, defTroops);
        break;
      case 'round.attack.move':
        this.moveTroops(troops);
        break;
      case 'round.retreat':
        this.retreat(this.state.active, this.state.target, troops);
        break;
      default:
        console.error('The movement button was clicked when it shouldn\'t \
          be visible');
        break;
    }
  }

  render() {
    let moveType, min, max;
    if (this.state.active !== null) {
      switch (this.state.phase) {
        case 'round.attack':
          moveType = 'attack';
          min = Math.min(1, this.state.active.troops - 1);
          max = Math.min(3, this.state.active.troops - 1);
          break;
        case 'round.retreat':
        case 'round.attack.move':
          moveType = 'move';
          min = Math.min(1, this.state.active.troops - 1);
          max = this.state.active.troops - 1;
          break;
        default:
          moveType = '';
          break;
      }
    }
    return (
      <div className="game">
        <p>{this.state.player.name}, supply: {this.state.player.supply}</p>
        <p>{this.state.phase}</p>
        {this.state.phase === 'round.attack' || this.state.phase === 'round.retreat' ?
          <div>
            <button onClick={this.endRound}>End Round</button>
            <button onClick={this.endAttacking}>Retreat</button>
          </div> :
          ''
        }
        <Board
          territoryClick={this.handleTerritoryClick}
          territories={this.state.territories}
          clickable={this.state.clickable}
          active={this.state.active}
        />
        <section>
          {
            this.state.active !== null ?
            (<Movement
              active={this.state.active}
              target={this.state.target}
              moveType={moveType}
              onSubmit={this.handleMovementClick}
              min={min}
              max={max}
            />) : ''
          }
        </section>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Risk />,
  document.getElementById('root')
);
